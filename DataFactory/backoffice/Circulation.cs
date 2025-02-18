﻿using DataModels.EntityModels;
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
        private LibraryDBContext _ctx = null;

        public Circulation()
        {
            _ctx = new LibraryDBContext();
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
                                          where ed.Status == true
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
                                              EquipmentIssuereturnId = ed.EquipmentIssuereturnId,
                                              IssueDate = ed.IssueDate,
                                              ReturnDate = ed.ReturnDate,
                                              Status = ed.Status,
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
                                              where ed.UserId == id && ed.Status == false
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
                                                  EquipmentIssuereturnId = ed.EquipmentIssuereturnId,
                                                  IssueDate = ed.IssueDate,
                                                  ReturnDate = ed.ReturnDate,
                                                  Status = ed.Status,
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
                            //Save Master
                            foreach (var item in model.Equipments)
                            {
                                var entityUpdate = _ctx.EquipmentIssueReturn.FirstOrDefault(x => x.Id == item.Id && x.Status == false);
                                if (entityUpdate != null)
                                {
                                    entityUpdate.Status = true;
                                    entityUpdate.ReturnDate = DateTime.Now;
                                    await _ctx.SaveChangesAsync();
                                }
                               
                            }

                            //Update Author
                           
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
                                                 where  ed.Status == false
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
                                                     EquipmentIssuereturnId = ed.EquipmentIssuereturnId,
                                                     IssueDate = ed.IssueDate,
                                                     ReturnDate = ed.ReturnDate,
                                                     Status = ed.Status,
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
                                             where ed.UserId == id && ed.Status == false
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
                                           EquipmentIssuereturnId=ed.EquipmentIssuereturnId,
                                           IssueDate=ed.IssueDate,
                                           ReturnDate=ed.ReturnDate,
                                           Status=ed.Status,
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
                                Status = false
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
