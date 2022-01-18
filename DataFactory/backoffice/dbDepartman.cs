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
    public class dbDepartman
    {
        private EquipmentDBContext _ctx = null;

        public dbDepartman()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<Departman>> getAll()
        {
            List<Departman> departmanList = null;

            try
            {
                using (_ctx)
                {
                    departmanList = await (from t in _ctx.dsDepartman
                                           where t.Status==1
                                   select new Departman
                                   
                                   {
                                       DepartmanId = t.DepartmanId,
                                       DepartmanName = t.DepartmanName
                                   }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return departmanList;
        }

        public async Task<Departman> getById(int id)
        {
            Departman departman = null;

            try
            {
                using (_ctx)
                {
                    departman = await _ctx.dsDepartman.FirstOrDefaultAsync(x =>x.DepartmanId ==id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return departman;
        }

        public async Task<string> create(Departman model)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        if (model.DepartmanId > 0)
                        {
                            //Update Departman
                            var entityUpdate = _ctx.dsDepartman.FirstOrDefault(x => x.DepartmanId == model.DepartmanId);
                            if (entityUpdate != null)
                            {
                                entityUpdate.DepartmanName = model.DepartmanName;
                                entityUpdate.CreateDate = model.CreateDate;
                                entityUpdate.LastUserId = model.LastUserId;
                                entityUpdate.Status = model.Status;
                                entityUpdate.LockStatus = model.LockStatus;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                            var departmanModel = new Departman
                            {
                                DepartmanName = model.DepartmanName,
                                CreateDate = model.CreateDate,
                                LastUserId = model.LastUserId,
                                Status = model.Status,
                                LockStatus= model.LockStatus
                            };
                            _ctx.dsDepartman.Add(departmanModel);
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
        public async Task<string> updateStatus(Departman model)
        {
            string message = string.Empty;
            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        if (model.DepartmanId > 0)
                        {
                            var entityUpdate = _ctx.dsDepartman.FirstOrDefault(x => x.DepartmanId == model.DepartmanId);
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
                        var idToRemove = _ctx.dsDepartman.SingleOrDefault(x => x.DepartmanId == id);
                        if (idToRemove != null)
                        {
                            _ctx.dsDepartman.Remove(idToRemove);
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
