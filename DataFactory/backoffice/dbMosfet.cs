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
    public class dbMosfet
    {
        private EquipmentDBContext _ctx = null;

        public dbMosfet()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<vmMosfet>> getAll()
        {
            List<vmMosfet> Mosfets = null;

            try
            {
                using (_ctx)
                {
                    Mosfets = await (from cp in _ctx.dsMosfet
                                             join p in _ctx.dsProject on cp.ProjectId equals p.Id
                                             join l in _ctx.dsLocation on cp.LocationId equals l.Id
                                             where cp.Status==1
                                             select new vmMosfet
                                             {
                                                Id = cp.Id,
                                                LocationId = cp.LocationId,
                                                LocationName= l.Name,
                                                Port = cp.Port,
                                                TeiPartNumber = cp.TeiPartNumber,
                                                Description = cp.Description,
                                                Supplier = cp.Supplier,
                                                SPN=cp.SPN,
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

            return Mosfets;
        }

        public async Task<vmMosfet> getById(int id)
        {
            vmMosfet model = null;

            try
            {
                using (_ctx)
                {
                    model = await (from cp in _ctx.dsMosfet
                                                join p in _ctx.dsProject on cp.ProjectId equals p.Id
                                                join l in _ctx.dsLocation on cp.LocationId equals l.Id
                                                where cp.Status == 1 && cp.Id==id   
                                                select new vmMosfet
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

        public async Task<string> create(Mosfet model)
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
                            //Update Mosfet
                            var entityUpdate = _ctx.dsMosfet.FirstOrDefault(x => x.Id == model.Id);
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
                           var MosfetModel = new Mosfet
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
                            _ctx.dsMosfet.Add(MosfetModel);
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
        public async Task<string> updateStatus(Mosfet model)
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
                            var entityUpdate = _ctx.dsMosfet.FirstOrDefault(x => x.Id == model.Id);
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
        public async Task<string> receive(vmMosfet model)
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
                            var entityUpdate = _ctx.dsMosfet.FirstOrDefault(x => x.Id == model.Id);
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
        public async Task<string> deleteById(int id)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        var idToRemove = _ctx.dsMosfet.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.dsMosfet.Remove(idToRemove);
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
