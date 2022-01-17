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
    public class ICregulators
    {
        private EquipmentDBContext _ctx = null;

        public ICregulators()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<vmICregulator>> getall()
        {
            List<vmICregulator> capacitors = null;

            try
            {
                using (_ctx)
                {
                    capacitors = await (from cp in _ctx.ICregulators
                                        join p in _ctx.Project on cp.ProjectId equals p.Id
                                             join l in _ctx.Location on cp.LocationId equals l.Id
                                             where cp.Status==1
                                             select new vmICregulator
                                             {
                                                Id = cp.Id,
                                                LocationId = cp.LocationId,
                                                LocationName= l.Name,
                                                Port = cp.Port,
                                                TeiPartNumber = cp.TeiPartNumber,
                                                Description = cp.Description,
                                                Supplier = cp.Supplier,
                                                SPN = cp.SPN,
                                                Quantity = cp.Quantity,
                                                MFPN=cp.MFPN,
                                                ProjectId=cp.ProjectId,
                                                ProjectName = p.ProjectName,
                                                Status =cp.Status,
                                                LockStatus=cp.LockStatus,
                                                CreateDate=cp.CreateDate,
                                                LastUserId=cp.LastUserId
                                            }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return capacitors;
        }

        public async Task<vmICregulator> getbyid(int id)
        {
            vmICregulator model = null;

            try
            {
                using (_ctx)
                {
                    model = await (from cp in _ctx.ICregulators
                                   join p in _ctx.Project on cp.ProjectId equals p.Id
                                                join l in _ctx.Location on cp.LocationId equals l.Id
                                                where cp.Status == 1 && cp.Id==id   
                                                select new vmICregulator
                                                {
                                                    Id = cp.Id,
                                                    LocationId = cp.LocationId,
                                                    LocationName = l.Name,
                                                    Port = cp.Port,
                                                    TeiPartNumber = cp.TeiPartNumber,
                                                    Description = cp.Description,
                                                    Supplier = cp.Supplier,
                                                    SPN = cp.SPN,
                                                    Quantity = cp.Quantity,
                                                    MFPN = cp.MFPN,
                                                    ProjectId = cp.ProjectId,
                                                    ProjectName=p.ProjectName,
                                                    Status = cp.Status,
                                                    LockStatus = cp.LockStatus,
                                                    CreateDate = cp.CreateDate,
                                                    LastUserId = cp.LastUserId
                                                }).FirstOrDefaultAsync();
                }
            
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return model;
        }

        public async Task<string> create(ICregulator model)
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
                            //Update Capacitor
                            var entityUpdate = _ctx.ICregulators.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.LocationId = model.LocationId;
                                entityUpdate.Port = model.Port;
                                entityUpdate.TeiPartNumber = model.TeiPartNumber;
                                entityUpdate.Description = model.Description;
                                entityUpdate.Supplier = model.Supplier;
                                entityUpdate.SPN = model.SPN;
                                entityUpdate.Quantity = model.Quantity;
                                entityUpdate.MFPN = model.MFPN;
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
                           var capacitorModel = new ICregulator
                           {
                                LocationId = model.LocationId,
                                Port = model.Port,
                                TeiPartNumber = model.TeiPartNumber,
                                Description = model.Description,
                                Supplier = model.Supplier,
                                SPN = model.SPN,
                                Quantity = model.Quantity,
                                MFPN = model.MFPN,
                                ProjectId = model.ProjectId,
                                Status = model.Status,
                                LockStatus = model.LockStatus,
                                LastUserId = model.LastUserId,
                                CreateDate = model.CreateDate,
                        };
                            _ctx.ICregulators.Add(capacitorModel);
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
        public async Task<string> updateStatus(ICregulator model)
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
                            var entityUpdate = _ctx.ICregulators.FirstOrDefault(x => x.Id == model.Id);
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
        public async Task<string> receive(vmICregulator model)
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
                            //Update Capacitor
                            var entityUpdate = _ctx.ICregulators.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.LocationId = model.LocationId;
                                entityUpdate.Port = model.Port;
                                entityUpdate.TeiPartNumber = model.TeiPartNumber;
                                entityUpdate.Description = model.Description;
                                entityUpdate.Supplier = model.Supplier;
                                entityUpdate.Quantity = model.Quantity - model.ReceiveQuantity;
                                entityUpdate.SPN = model.SPN;
                                entityUpdate.MFPN = model.MFPN;
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
        public async Task<string> deletebyid(int id)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        var idToRemove = _ctx.ICregulators.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.ICregulators.Remove(idToRemove);
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
