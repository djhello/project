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
    public class Departmans
    {
        private EquipmentDBContext _ctx = null;

        public Departmans()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<Departman>> getall()
        {
            List<Departman> departmanList = null;

            try
            {
                using (_ctx)
                {
                    departmanList = await (from t in _ctx.Departman

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

        public async Task<Departman> getbyid(int id)
        {
            Departman departman = null;

            try
            {
                using (_ctx)
                {
                    departman = await _ctx.Departman.FirstOrDefaultAsync(x =>x.DepartmanId ==id);
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
                            var entityUpdate = _ctx.Departman.FirstOrDefault(x => x.DepartmanId == model.DepartmanId);
                            if (entityUpdate != null)
                            {
                                entityUpdate.DepartmanName = model.DepartmanName;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                            var departmanModel = new Departman
                            {
                                DepartmanName = model.DepartmanName
                            };
                            _ctx.Departman.Add(departmanModel);
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
                        var idToRemove = _ctx.Departman.SingleOrDefault(x => x.DepartmanId == id);
                        if (idToRemove != null)
                        {
                            _ctx.Departman.Remove(idToRemove);
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
