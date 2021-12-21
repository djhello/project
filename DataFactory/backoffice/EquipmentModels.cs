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
    public class EquipmentModels
    {
        private EquipmentDBContext _ctx = null;

        public EquipmentModels()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<vmEquipmentModel>> getall()
        {
            List<vmEquipmentModel> equipmentModels = null;

            try
            {
                using (_ctx)
                {
                    equipmentModels = await (from eqM in _ctx.EquipmentModel
                                             join d in _ctx.Departman on eqM.DepartmanId equals d.DepartmanId
                                             where eqM.Status==1
                                             select new vmEquipmentModel
                                            {
                                                Id = eqM.Id,
                                                Name = eqM.Name,
                                                Quantity = eqM.Quantity,
                                                DepartmanId=eqM.DepartmanId,
                                                DepartmanName=d.DepartmanName,
                                                Description = eqM.Description,
                                                EDocWebAddress = eqM.EDocWebAddress,
                                                EDocLocalAddress=eqM.EDocLocalAddress,
                                                CoverImage=eqM.CoverImage
                                            }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return equipmentModels;
        }

        public async Task<EquipmentModel> getbyid(int id)
        {
            EquipmentModel model = null;

            try
            {
                using (_ctx)
                {
                    model = await _ctx.EquipmentModel.FirstOrDefaultAsync(x => x.Id == id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return model;
        }

        public async Task<string> create(EquipmentModel model)
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
                            //Update calibration
                            var entityUpdate = _ctx.EquipmentModel.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.Name = model.Name;
                                entityUpdate.Description = model.Description;
                                entityUpdate.Quantity = model.Quantity;
                                entityUpdate.DepartmanId = model.DepartmanId;
                                entityUpdate.EDocLocalAddress = model.EDocLocalAddress;
                                entityUpdate.EDocWebAddress = model.EDocWebAddress;
                                entityUpdate.CoverImage = model.CoverImage;
                                entityUpdate.CreateDate = model.CreateDate;
                                entityUpdate.LastUserId = model.LastUserId;
                                entityUpdate.LockStatus = model.LockStatus;
                                entityUpdate.Status = model.Status;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                           var equipmentModel = new EquipmentModel
                            {
                                Name = model.Name,
                                Description = model.Description,
                                Quantity = model.Quantity,
                                DepartmanId = model.DepartmanId,
                                EDocLocalAddress = model.EDocLocalAddress,
                                EDocWebAddress = model.EDocWebAddress,
                                CoverImage = model.CoverImage,
                                CreateDate = model.CreateDate,
                                LastUserId = model.LastUserId,
                                LockStatus = model.LockStatus,
                                Status = model.Status
                        };
                            _ctx.EquipmentModel.Add(equipmentModel);
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
        public async Task<string> updateStatus(EquipmentModel model)
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
                            //Update Status
                            var entityUpdate = _ctx.EquipmentModel.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.CreateDate = model.CreateDate;
                                entityUpdate.LastUserId = model.LastUserId;
                                entityUpdate.LockStatus = model.LockStatus;
                                entityUpdate.Status = model.Status;
                                await _ctx.SaveChangesAsync();
                            }
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
        public async Task<string> deletebyid(int id)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        var idToRemove = _ctx.EquipmentModel.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.EquipmentModel.Remove(idToRemove);
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
