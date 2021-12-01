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
    public class Equipments
    {
        private EquipmentDBContext _ctx = null;

        public Equipments()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<vmEquipment>> getall()
        {
            List<vmEquipment> vEquipments = null;

            try
            {
                using (_ctx)
                {
                    vEquipments = await (from eq in _ctx.vEquipment
                                   select new vmEquipment
                                   {
                                       Id = eq.Id,
                                       EquipmentId = eq.EquipmentId,
                                       CalibrationId=eq.CalibrationId,
                                       CalibrationName = eq.CalibrationName,
                                       EquipmentName = eq.EquipmentName,
                                       Description = eq.Description,
                                       SerialPortUSB = eq.SerialPortUSB,
                                       PermanentLocationId = eq.PermanentLocationId,
                                       PermanentLocation = eq.PermanentLocation,
                                       CurrentLocationId=eq.CurrentLocationId,
                                       CurrentLocation = eq.CurrentLocation,
                                       CurrentUserId=eq.CurrentUserId,
                                       FirstName=eq.FirstName,
                                       LastName=eq.LastName,
                                       EquipmentModelId = eq.EquipmentModelId,
                                       EquipmentModel = eq.EquipmentModel,
                                       EquipmentModelDescription = eq.EquipmentModelDescription,
                                       EDocWebAddress = eq.EDocWebAddress,
                                       EDocLocalAddress = eq.EDocLocalAddress,
                                       CoverImage = eq.CoverImage
                                   }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return vEquipments;
        }
        public async Task<List<vmAvailableEquipment>> getavailableallequipment()
        {
            List<vmAvailableEquipment> vEquipments = null;

            try
            {

              

                /*WHERE(id NOT IN
                             (SELECT        equipmentId
                               FROM            dbo.equipment_issuereturn
                               WHERE(returnDate IS NULL) AND(status = 0)))

    */

                using (_ctx)
                {
                    vEquipments = await (from eq in _ctx.vAvailableEquipment
                                         select new vmAvailableEquipment
                                         {
                                             Id = eq.Id,
                                             EquipmentId = eq.EquipmentId,
                                             CalibrationId = eq.CalibrationId,
                                             CalibrationName = eq.CalibrationName,
                                             EquipmentName = eq.EquipmentName,
                                             Description = eq.Description,
                                             SerialPortUSB = eq.SerialPortUSB,
                                             PermanentLocationId = eq.PermanentLocationId,
                                             PermanentLocation = eq.PermanentLocation,
                                             CurrentLocationId = eq.CurrentLocationId,
                                             CurrentLocation = eq.CurrentLocation,
                                             CurrentUserId = eq.CurrentUserId,
                                             FirstName = eq.FirstName,
                                             LastName = eq.LastName,
                                             EquipmentModelId = eq.EquipmentModelId,
                                             EquipmentModel = eq.EquipmentModel,
                                             EquipmentModelDescription = eq.EquipmentModelDescription,
                                             EDocWebAddress = eq.EDocWebAddress,
                                             EDocLocalAddress = eq.EDocLocalAddress,
                                             CoverImage = eq.CoverImage
                                         }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return vEquipments;
        }
        public async Task<vmEquipment> getbyid(int id)
        {
            vmEquipment vmEquipment = null;

            try
            {
                using (_ctx)
                {
                    vmEquipment = await _ctx.vEquipment.FirstOrDefaultAsync(x => x.Id == id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return vmEquipment;
        }
        public async Task<List<vmEquipment>> getbytext(string text)
        {
            List<vmEquipment> vEquipments = null;

            try
            {
                using (_ctx)
                {
                    vEquipments = await (
                                         from eq in _ctx.vEquipment
                                         where eq.EquipmentId.Contains(text)
                                         select new vmEquipment
                                         {
                                             Id = eq.Id,
                                             EquipmentId = eq.EquipmentId,
                                             CalibrationId = eq.CalibrationId,
                                             CalibrationName = eq.CalibrationName,
                                             EquipmentName = eq.EquipmentName,
                                             Description = eq.Description,
                                             SerialPortUSB = eq.SerialPortUSB,
                                             PermanentLocationId = eq.PermanentLocationId,
                                             PermanentLocation = eq.PermanentLocation,
                                             CurrentLocationId = eq.CurrentLocationId,
                                             CurrentLocation = eq.CurrentLocation,
                                             CurrentUserId = eq.CurrentUserId,
                                             FirstName = eq.FirstName,
                                             LastName = eq.LastName,
                                             EquipmentModelId = eq.EquipmentModelId,
                                             EquipmentModel = eq.EquipmentModel,
                                             EquipmentModelDescription = eq.EquipmentModelDescription,
                                             EDocWebAddress = eq.EDocWebAddress,
                                             EDocLocalAddress = eq.EDocLocalAddress,
                                             CoverImage = eq.CoverImage
                                         }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return vEquipments;
        }
    
        public async Task<string> create(Equipment model)
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
                            var entityUpdate = _ctx.Equipment.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.EquipmentId = model.EquipmentId;
                                entityUpdate.EquipmentModelId = model.EquipmentModelId;
                                entityUpdate.CalibrationId = model.CalibrationId;
                                entityUpdate.EquipmentName = model.EquipmentName;
                                entityUpdate.Description = model.Description;
                                entityUpdate.SerialPortUSB = model.SerialPortUSB;
                                entityUpdate.CurrentLocationId = model.PermanentLocationId;
                                entityUpdate.PermanentLocationId = model.PermanentLocationId;
                                entityUpdate.CurrentUserId = model.CurrentUserId;
                                
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                            var equipmentModel = new Equipment
                            {
                                EquipmentId = model.EquipmentId,
                                EquipmentModelId = model.EquipmentModelId,
                                CalibrationId = model.CalibrationId,
                                EquipmentName = model.EquipmentName,
                                Description = model.Description,
                                SerialPortUSB = model.SerialPortUSB,
                                CurrentLocationId = model.PermanentLocationId,
                                PermanentLocationId = model.PermanentLocationId,
                                CurrentUserId = model.CurrentUserId
                        };
                            _ctx.Equipment.Add(equipmentModel);
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
                        var idToRemove = _ctx.Equipment.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.Equipment.Remove(idToRemove);
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
