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
    public class dbEquipment
    {
        private EquipmentDBContext _ctx = null;

        public dbEquipment()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<vmEquipment>> getAll()
        {
            List<vmEquipment> vEquipments = null;

            try
            {
                using (_ctx)
                {
                    vEquipments = await (from eq in _ctx.dsvmEquipment
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
                                       CoverImage = eq.CoverImage,
                                       LastUserId=eq.LastUserId,
                                       CreateDate=eq.CreateDate,
                                       Status=eq.Status,
                                       LockStatus=eq.LockStatus
                                   }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return vEquipments;
        }
        public async Task<List<vmAvailableEquipment>> getAvailableallEquipment()
        {
            List<vmAvailableEquipment> vEquipments = null;

            try
            {
                using (_ctx)
                {
                    vEquipments = await (from eq in _ctx.dsvmAvailableEquipment
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
        public async Task<vmEquipment> getById(int id)
        {
            vmEquipment vmEquipment = null;

            try
            {
                using (_ctx)
                {
                    vmEquipment = await _ctx.dsvmEquipment.FirstOrDefaultAsync(x => x.Id == id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return vmEquipment;
        }
        public async Task<List<vmEquipment>> getByText(string text)
        {
            List<vmEquipment> vEquipments = null;

            try
            {
                using (_ctx)
                {
                    vEquipments = await (
                                         from eq in _ctx.dsvmEquipment
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
                                             CoverImage = eq.CoverImage,
                                             LastUserId = eq.LastUserId,
                                             CreateDate = eq.CreateDate,
                                             Status = eq.Status,
                                             LockStatus = eq.LockStatus
                                         }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return vEquipments;
        }
    
        public async Task<string> create(Hardware model)
        {
            _ctx = new EquipmentDBContext();

            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        if (model.Id > 0)
                        {
                            //Update Equipment
                            var entityUpdate = _ctx.dsEquipment.FirstOrDefault(x => x.Id == model.Id);
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
                                entityUpdate.LastUserId = model.LastUserId;
                                entityUpdate.CreateDate = model.CreateDate;
                                entityUpdate.LockStatus = model.LockStatus;
                                entityUpdate.Status = model.Status;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                            var equipmentModel = new Hardware
                            {
                                EquipmentId = model.EquipmentId,
                                EquipmentModelId = model.EquipmentModelId,
                                CalibrationId = model.CalibrationId,
                                EquipmentName = model.EquipmentName,
                                Description = model.Description,
                                SerialPortUSB = model.SerialPortUSB,
                                CurrentLocationId = model.PermanentLocationId,
                                PermanentLocationId = model.PermanentLocationId,
                                CurrentUserId = model.CurrentUserId,
                                LastUserId = model.LastUserId,
                                CreateDate = model.CreateDate,
                                LockStatus = model.LockStatus,
                                Status = model.Status
                        };
                            _ctx.dsEquipment.Add(equipmentModel);
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
        public async Task<string> updateStatus(Hardware model)
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
                            var entityUpdate = _ctx.dsEquipment.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.Status = Convert.ToByte((entityUpdate.Status == 1) ? 0 : 1);
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
                        var idToRemove = _ctx.dsEquipment.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.dsEquipment.Remove(idToRemove);
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
