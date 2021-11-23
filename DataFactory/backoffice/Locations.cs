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
    public class Locations
    {
        private EquipmentDBContext _ctx = null;

        public Locations()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<vmLocation>> getall()
        {
            List<vmLocation> locationList = null;

            try
            {
                using (_ctx)
                {
                    locationList = await (from t in _ctx.Location

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

        public async Task<Location> getbyid(int id)
        {
            Location location = null;

            try
            {
                using (_ctx)
                {
                    location = await _ctx.Location.FirstOrDefaultAsync(x =>x.Id ==id);
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
                            var entityUpdate = _ctx.Location.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.Name = model.Name;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                            var locationModel = new Location
                            {
                                Name = model.Name
                            };
                            _ctx.Location.Add(locationModel);
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

        public async Task<string> deletebyid(int id)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        var idToRemove = _ctx.Location.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.Location.Remove(idToRemove);
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
