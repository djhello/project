using DataModels.EntityModels;
using DataModels.ViewModels;
using DataUtilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataFactory.backoffice
{
    public class dbLocation
    {
        private EquipmentDBContext _ctx = null;

        public dbLocation()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<vmLocation>> getAll()
        {
            List<vmLocation> locationList = null;

            try
            {
                using (_ctx)
                {
                    locationList = await (from t in _ctx.dsLocation
                                          where t.Status==1
                                      select new vmLocation

                                   {
                                       id = t.Id,
                                       name = t.Name
                                   }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return locationList;
        }

        public async Task<Location> getById(int id)
        {
            Location location = null;

            try
            {
                using (_ctx)
                {
                    location = await _ctx.dsLocation.FirstOrDefaultAsync(x =>x.Id ==id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return location;
        }

        public async Task<string> create(Location model)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        if (model.Id > 0)
                        {
                            //Update Location
                            var entityUpdate = _ctx.dsLocation.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.Name = model.Name;
                                entityUpdate.LastUserId = model.LastUserId;
                                entityUpdate.CreateDate = model.CreateDate;
                                entityUpdate.LockStatus = model.LockStatus;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                            var locationModel = new Location
                            {
                                Name = model.Name,
                                CreateDate = model.CreateDate,
                                LastUserId = model.LastUserId,
                                Status = model.Status,
                                LockStatus = model.LockStatus
                            };
                            _ctx.dsLocation.Add(locationModel);
                            await _ctx.SaveChangesAsync();
                        }

                        _ctxTransaction.Commit();
                        message = MessageConstants.Saved;
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback();
                        e.ToString();
                        message = MessageConstants.SavedWarning;
                    }
                }
            }

            return message;
        }
        public async Task<string> updateStatus(Location model)
        {
            string message = string.Empty;
            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        if (model.Id > 0)
                        {
                            var entityUpdate = _ctx.dsLocation.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.Status = model.Status;
                                entityUpdate.LastUserId = model.LastUserId;
                                entityUpdate.CreateDate = model.CreateDate;
                                entityUpdate.LockStatus = model.LockStatus;
                                await _ctx.SaveChangesAsync();
                                message = MessageConstants.Saved;
                            }
                        }
                        _ctxTransaction.Commit();
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback();
                        e.ToString();
                        message = MessageConstants.SavedWarning;
                    }
                }
            }

            return message;
        }
        public async Task<string> deleteById(int id)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        var idToRemove = _ctx.dsLocation.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.dsLocation.Remove(idToRemove);
                            await _ctx.SaveChangesAsync();
                        }
                        _ctxTransaction.Commit();
                        message = MessageConstants.Deleted;
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback();
                        e.ToString();
                        message = MessageConstants.DeletedWarning;
                    }
                }
            }

            return message;
        }
    }
}
