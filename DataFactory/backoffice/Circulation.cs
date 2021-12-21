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
    public class Circulation
    {
        private EquipmentDBContext _ctx = null;

        public Circulation()
        {
            _ctx = new EquipmentDBContext();
        }

        #region --Return
        public async Task<List<vmEquipmentIssuereturn>> getreturnall()
        {
            List<vmEquipmentIssuereturn> equipmentReturned = null;

            try
            {
                using (_ctx)
                {
                    equipmentReturned = await (from ed in _ctx.vEquipmentIssueReturn
                                          where ed.IsReturn == true
                                          select new vmEquipmentIssuereturn
                                          {
                                              Id = ed.Id,
                                              EquipmentId = ed.EquipmentId,
                                              CalibrationId = ed.CalibrationId,
                                              CalibrationName = ed.CalibrationName,
                                              EquipmentName = ed.EquipmentName,
                                              Description = ed.Description,
                                              SerialPortUSB = ed.SerialPortUSB,
                                              PermanentLocationId = ed.PermanentLocationId,
                                              PermanentLocation = ed.PermanentLocation,
                                              CurrentLocationId = ed.CurrentLocationId,
                                              CurrentLocation = ed.CurrentLocation,
                                              CurrentUserId = ed.CurrentUserId,
                                              FirstName = ed.FirstName,
                                              LastName = ed.LastName,
                                              EquipmentModelId = ed.EquipmentModelId,
                                              EquipmentModel = ed.EquipmentModel,
                                              EquipmentModelDescription = ed.EquipmentModelDescription,
                                              EDocWebAddress = ed.EDocWebAddress,
                                              EDocLocalAddress = ed.EDocLocalAddress,
                                              CoverImage = ed.CoverImage,
                                              EquipmentIssueReturnId = ed.EquipmentIssueReturnId,
                                              IssueDate = ed.IssueDate,
                                              ReturnDate = ed.ReturnDate,
                                              IsReturn = ed.IsReturn,
                                              UserId = ed.UserId,
                                              OduncAlanAdi = ed.FirstName,
                                              OduncAlanSoyadi = ed.LastName,
                                              DueDate = ed.DueDate,

                                          }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return equipmentReturned;
        }

        public async Task<List<vmEquipmentIssuereturn>> getreturnbyid(int id)
        {
            List<vmEquipmentIssuereturn> equipmentIssueed = null;

            try
            {
                using (_ctx)
                {

                    equipmentIssueed = await (from ed in _ctx.vEquipmentIssueReturn
                                              where ed.UserId == id && ed.IsReturn == false
                                              select new vmEquipmentIssuereturn
                                              {
                                                  Id = ed.Id,
                                                  EquipmentId = ed.EquipmentId,
                                                  CalibrationId = ed.CalibrationId,
                                                  CalibrationName = ed.CalibrationName,
                                                  EquipmentName = ed.EquipmentName,
                                                  Description = ed.Description,
                                                  SerialPortUSB = ed.SerialPortUSB,
                                                  PermanentLocationId = ed.PermanentLocationId,
                                                  PermanentLocation = ed.PermanentLocation,
                                                  CurrentLocationId = ed.CurrentLocationId,
                                                  CurrentLocation = ed.CurrentLocation,
                                                  CurrentUserId = ed.CurrentUserId,
                                                  FirstName = ed.FirstName,
                                                  LastName = ed.LastName,
                                                  EquipmentModelId = ed.EquipmentModelId,
                                                  EquipmentModel = ed.EquipmentModel,
                                                  EquipmentModelDescription = ed.EquipmentModelDescription,
                                                  EDocWebAddress = ed.EDocWebAddress,
                                                  EDocLocalAddress = ed.EDocLocalAddress,
                                                  CoverImage = ed.CoverImage,
                                                  EquipmentIssueReturnId = ed.EquipmentIssueReturnId,
                                                  IssueDate = ed.IssueDate,
                                                  ReturnDate = ed.ReturnDate,
                                                  IsReturn = ed.IsReturn,
                                                  UserId = ed.UserId,
                                                  OduncAlanAdi = ed.FirstName,
                                                  OduncAlanSoyadi = ed.LastName,
                                                  DueDate = ed.DueDate,//.ToString(StaticInfos.GlobalDateFormat)
                                              }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return equipmentIssueed;
        }

        public async Task<string> returnequipment(EquipmentIssueReturn model)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        if (model.UserId > 0)
                        {
                            foreach (var item in model.Equipments)
                            {
                                var entityUpdate = _ctx.EquipmentIssueReturn.FirstOrDefault(x => x.Id == item.Id && x.IsReturn == false);
                                if (entityUpdate != null)
                                {
                                    entityUpdate.IsReturn = true;
                                    entityUpdate.ReturnDate = DateTime.Now;
                                    entityUpdate.CreateDate = model.CreateDate;
                                    entityUpdate.LastUserId = model.LastUserId;
                                    entityUpdate.Status = model.Status;
                                    entityUpdate.LockStatus = model.LockStatus;
                                    await _ctx.SaveChangesAsync();
                                }
                               
                            }
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
        #endregion

        #region --Issue
        public async Task<List<vmEquipmentIssuereturn>> getissueall()
        {
            List<vmEquipmentIssuereturn> equipmentIssueed = null;

            try
            {
                using (_ctx)
                {

                    equipmentIssueed = await (from ed in _ctx.vEquipmentIssueReturn
                                                 where  ed.IsReturn == false
                                                 select new vmEquipmentIssuereturn
                                                 {
                                                     Id = ed.Id,
                                                     EquipmentId = ed.EquipmentId,
                                                     CalibrationId = ed.CalibrationId,
                                                     CalibrationName = ed.CalibrationName,
                                                     EquipmentName = ed.EquipmentName,
                                                     Description = ed.Description,
                                                     SerialPortUSB = ed.SerialPortUSB,
                                                     PermanentLocationId = ed.PermanentLocationId,
                                                     PermanentLocation = ed.PermanentLocation,
                                                     CurrentLocationId = ed.CurrentLocationId,
                                                     CurrentLocation = ed.CurrentLocation,
                                                     CurrentUserId = ed.CurrentUserId,
                                                     FirstName = ed.FirstName,
                                                     LastName = ed.LastName,
                                                     EquipmentModelId = ed.EquipmentModelId,
                                                     EquipmentModel = ed.EquipmentModel,
                                                     EquipmentModelDescription = ed.EquipmentModelDescription,
                                                     EDocWebAddress = ed.EDocWebAddress,
                                                     EDocLocalAddress = ed.EDocLocalAddress,
                                                     CoverImage = ed.CoverImage,
                                                     EquipmentIssueReturnId = ed.EquipmentIssueReturnId,
                                                     IssueDate = ed.IssueDate,
                                                     ReturnDate = ed.ReturnDate,
                                                     IsReturn = ed.IsReturn,
                                                     UserId = ed.UserId,
                                                     OduncAlanAdi = ed.FirstName,
                                                     OduncAlanSoyadi = ed.LastName,
                                                     DueDate = ed.DueDate,//.ToString(StaticInfos.GlobalDateFormat)
                                                 }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return equipmentIssueed;
        }

        public async Task<List<vmEquipmentIssuereturn>> getissuebyid(int id)
        {
            List<vmEquipmentIssuereturn> equipmentIssueeList = null;

            try
            {
                using (_ctx)
                {
                    equipmentIssueeList = await (from ed in _ctx.vEquipmentIssueReturn
                                             where ed.UserId == id && ed.IsReturn == false
                                    select new vmEquipmentIssuereturn
                                       {
                                           Id = ed.Id,
                                           EquipmentId = ed.EquipmentId,
                                           CalibrationId = ed.CalibrationId,
                                           CalibrationName = ed.CalibrationName,
                                           EquipmentName = ed.EquipmentName,
                                           Description = ed.Description,
                                           SerialPortUSB = ed.SerialPortUSB,
                                           PermanentLocationId = ed.PermanentLocationId,
                                           PermanentLocation = ed.PermanentLocation,
                                           CurrentLocationId = ed.CurrentLocationId,
                                           CurrentLocation = ed.CurrentLocation,
                                           CurrentUserId = ed.CurrentUserId,
                                           FirstName = ed.FirstName,
                                           LastName = ed.LastName,
                                           EquipmentModelId = ed.EquipmentModelId,
                                           EquipmentModel = ed.EquipmentModel,
                                           EquipmentModelDescription = ed.EquipmentModelDescription,
                                           EDocWebAddress = ed.EDocWebAddress,
                                           EDocLocalAddress = ed.EDocLocalAddress,
                                           CoverImage = ed.CoverImage,
                                           EquipmentIssueReturnId=ed.EquipmentIssueReturnId,
                                           IssueDate=ed.IssueDate,
                                           ReturnDate=ed.ReturnDate,
                                           IsReturn = ed.IsReturn,
                                           UserId = ed.UserId,
                                           OduncAlanAdi = ed.FirstName,
                                           OduncAlanSoyadi =ed.LastName,
                                           DueDate = DateTime.Now.AddDays(15),//.ToString(StaticInfos.GlobalDateFormat)
                                       }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return equipmentIssueeList;
        }

        
        
        public async Task<string> issueequipment(EquipmentIssueReturn model)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        var listEquipments = new List<EquipmentIssueReturn>();
                        //Save Master
                        foreach (var item in model.Equipments)
                        {
                            var EquipemtnModel = new EquipmentIssueReturn
                            {

                                UserId = model.UserId,
                                IssueDate = DateTime.Now,
                                EquipmentId = item.Id,
                                DueDate = Convert.ToDateTime(model.DueDate),
                                IsReturn = false,
                                CreateDate = model.CreateDate,
                                LastUserId = model.LastUserId,
                                Status = model.Status,
                                LockStatus = model.LockStatus
                            };
                            listEquipments.Add(EquipemtnModel);                           
                        }
                        _ctx.EquipmentIssueReturn.AddRange(listEquipments);
                        await _ctx.SaveChangesAsync();
                        message = MessageConstants.Saved;
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
        #endregion
    }
}
