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
    public class Resistors
    {
        private EquipmentDBContext _ctx = null;

        public Resistors()
        {
            _ctx = new EquipmentDBContext();
        }
        
        public async Task<List<vmResistor>> getall()
        {
            List<vmResistor> Resistors = null;

            try
            {
                using (_ctx)
                {
                    Resistors = await (from cp in _ctx.Resistor
                                             join p in _ctx.Project on cp.ProjectId equals p.Id
                                             join l in _ctx.Location on cp.LocationId equals l.Id
                                             where cp.Status==1
                                             select new vmResistor
                                             {
                                                 Id = cp.Id,
                                                 LocationId = cp.LocationId,
                                                 LocationName = l.Name,
                                                 Port = cp.Port,
                                                 TeiPartNumber = cp.TeiPartNumber,
                                                 Description = cp.Description,
                                                 Value = cp.Value,
                                                 Voltage = cp.Voltage,
                                                 Power = cp.Power,
                                                 Current = cp.Current,
                                                 ManufacturePartNumber = cp.ManufacturePartNumber,
                                                 Quantity = cp.Quantity,
                                                 Package = cp.Package,
                                                 ProjectId = cp.ProjectId,
                                                 ProjectName = p.ProjectName,
                                                 Status = cp.Status,
                                                 LockStatus = cp.LockStatus,
                                                 CreateDate = cp.CreateDate,
                                                 LastUserId = cp.LastUserId
                                             }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return Resistors;
        }

        public async Task<vmResistor> getbyid(int id)
        {
            vmResistor model = null;

            try
            {
                using (_ctx)
                {
                    model = await (from cp in _ctx.Resistor
                                                join p in _ctx.Project on cp.ProjectId equals p.Id
                                                join l in _ctx.Location on cp.LocationId equals l.Id
                                                where cp.Status == 1 && cp.Id==id   
                                                select new vmResistor
                                                {
                                                    Id = cp.Id,
                                                    LocationId = cp.LocationId,
                                                    LocationName = l.Name,
                                                    Port = cp.Port,
                                                    TeiPartNumber = cp.TeiPartNumber,
                                                    Description = cp.Description,
                                                    Value = cp.Value,
                                                    Voltage = cp.Voltage,
                                                    Power = cp.Power,
                                                    Current = cp.Current,
                                                    ManufacturePartNumber = cp.ManufacturePartNumber,
                                                    Quantity = cp.Quantity,
                                                    Package = cp.Package,
                                                    ProjectId = cp.ProjectId,
                                                    ProjectName = p.ProjectName,
                                                    Status = cp.Status,
                                                    LockStatus = cp.LockStatus,
                                                    CreateDate = cp.CreateDate,
                                                }).FirstOrDefaultAsync();
                }
            
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return model;
        }

        public async Task<string> create(Resistor model)
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
                            //Update Resistor
                            var entityUpdate = _ctx.Resistor.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.LocationId = model.LocationId;
                                entityUpdate.Port = model.Port;
                                entityUpdate.TeiPartNumber = model.TeiPartNumber;
                                entityUpdate.Description = model.Description;
                                entityUpdate.Value = model.Value;
                                entityUpdate.Quantity = model.Quantity;
                                entityUpdate.Voltage = model.Voltage;
                                entityUpdate.Power = model.Power;
                                entityUpdate.ManufacturePartNumber = model.ManufacturePartNumber;
                                entityUpdate.Current = model.Current;
                                entityUpdate.Package = model.Package;
                                entityUpdate.ProjectId = model.ProjectId;
                                entityUpdate.Status = model.Status;
                                entityUpdate.LockStatus = model.LockStatus;
                                entityUpdate.LastUserId = model.LastUserId;
                                entityUpdate.CreateDate = model.CreateDate;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                           var ResistorModel = new Resistor
                           {
                               LocationId = model.LocationId,
                               Port = model.Port,
                               TeiPartNumber = model.TeiPartNumber,
                               Description = model.Description,
                               Value = model.Value,
                               Quantity = model.Quantity,
                               Voltage = model.Voltage,
                               Power = model.Power,
                               ManufacturePartNumber = model.ManufacturePartNumber,
                               Current = model.Current,
                               Package = model.Package,
                               ProjectId = model.ProjectId,
                               Status = model.Status,
                               LockStatus = model.LockStatus,
                               LastUserId = model.LastUserId,
                               CreateDate = model.CreateDate,
                           };
                            _ctx.Resistor.Add(ResistorModel);
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
        public async Task<string> receive(vmResistor model)
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
                            //Update receive
                            var entityUpdate = _ctx.Resistor.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.LocationId = model.LocationId;
                                entityUpdate.Port = model.Port;
                                entityUpdate.TeiPartNumber = model.TeiPartNumber;
                                entityUpdate.Description = model.Description;
                                entityUpdate.Value = model.Value;
                                entityUpdate.Quantity = model.Quantity - model.ReceiveQuantity;
                                entityUpdate.Voltage = model.Voltage;
                                entityUpdate.Power = model.Power;
                                entityUpdate.ManufacturePartNumber = model.ManufacturePartNumber;
                                entityUpdate.Current = model.Current;
                                entityUpdate.Package = model.Package;
                                entityUpdate.ProjectId = model.ProjectId;
                                entityUpdate.Status = model.Status;
                                entityUpdate.LockStatus = model.LockStatus;
                                entityUpdate.LastUserId = model.LastUserId;
                                entityUpdate.CreateDate = model.CreateDate;
                                await _ctx.SaveChangesAsync();
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
        public async Task<string> updateStatus(Resistor model)
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
                            var entityUpdate = _ctx.Resistor.FirstOrDefault(x => x.Id == model.Id);
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
                        var idToRemove = _ctx.Resistor.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.Resistor.Remove(idToRemove);
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
