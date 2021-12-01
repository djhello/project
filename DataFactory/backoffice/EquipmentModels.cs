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
                                   select new vmEquipmentModel
                                   {
                                       Id = eqM.Id,
                                       Name = eqM.Name,
                                       Quantity = eqM.Quantity,
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

        public async Task<string> create(EquipmentModel eqipmentModel)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        if (eqipmentModel.Id > 0)
                        {
                            //Update calibration
                            var entityUpdate = _ctx.EquipmentModel.FirstOrDefault(x => x.Id == eqipmentModel.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.Name = eqipmentModel.Name;
                                entityUpdate.Description = eqipmentModel.Description;
                                entityUpdate.Quantity = eqipmentModel.Quantity;
                                entityUpdate.EDocLocalAddress = eqipmentModel.EDocLocalAddress;
                                entityUpdate.EDocWebAddress = eqipmentModel.EDocWebAddress;
                                entityUpdate.CoverImage = eqipmentModel.CoverImage;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                           var equipmentModel = new EquipmentModel
                            {
                                Name = eqipmentModel.Name,
                                Description = eqipmentModel.Description,
                                Quantity = eqipmentModel.Quantity,
                                EDocLocalAddress = eqipmentModel.EDocLocalAddress,
                                EDocWebAddress = eqipmentModel.EDocWebAddress,
                                CoverImage = eqipmentModel.CoverImage
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
