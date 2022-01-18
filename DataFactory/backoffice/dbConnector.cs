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
    public class dbConnector
    {
        private EquipmentDBContext _ctx = null;

        public dbConnector()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<vmConnector>> getAll()
        {
            List<vmConnector> connectors = null;

            try
            {
                using (_ctx)
                {
                    connectors = await (from cp in _ctx.dsConnector
                                             join p in _ctx.dsProject on cp.ProjectId equals p.Id
                                             join l in _ctx.dsLocation on cp.LocationId equals l.Id
                                             where cp.Status==1
                                             select new vmConnector
                                             {
                                                Id = cp.Id,
                                                LocationId = cp.LocationId,
                                                LocationName= l.Name,
                                                Port = cp.Port,
                                                TeiPartNumber = cp.TeiPartNumber,
                                                Description = cp.Description,
                                                ManufacturePartNumber = cp.ManufacturePartNumber,
                                                Quantity = cp.Quantity,
                                                Manufacturer=cp.Manufacturer,
                                                Package=cp.Package,
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

            return connectors;
        }

        public async Task<vmConnector> getById(int id)
        {
            vmConnector model = null;

            try
            {
                using (_ctx)
                {
                    model = await (from cp in _ctx.dsConnector
                                        join p in _ctx.dsProject on cp.ProjectId equals p.Id
                                        join l in _ctx.dsLocation on cp.LocationId equals l.Id
                                        where cp.Status == 1 && cp.Id==id
                                        select new vmConnector
                                        {
                                            Id = cp.Id,
                                            LocationId = cp.LocationId,
                                            LocationName = l.Name,
                                            Port = cp.Port,
                                            TeiPartNumber = cp.TeiPartNumber,
                                            Description = cp.Description,
                                            ManufacturePartNumber = cp.ManufacturePartNumber,
                                            Quantity = cp.Quantity,
                                            Manufacturer = cp.Manufacturer,
                                            Package = cp.Package,
                                            ProjectId = cp.ProjectId,
                                            ProjectName = p.ProjectName,
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

        public async Task<string> create(Connector model)
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
                            //Update Connector
                            var entityUpdate = _ctx.dsConnector.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.LocationId = model.LocationId;
                                entityUpdate.Port = model.Port;
                                entityUpdate.TeiPartNumber = model.TeiPartNumber;
                                entityUpdate.Description = model.Description;
                                entityUpdate.Manufacturer = model.Manufacturer;
                                entityUpdate.Quantity = model.Quantity;
                                entityUpdate.ManufacturePartNumber = model.ManufacturePartNumber;
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
                           var ConnectorModel = new Connector
                           {
                                LocationId = model.LocationId,
                                Port = model.Port,
                                TeiPartNumber = model.TeiPartNumber,
                                Description = model.Description,
                                Manufacturer = model.Manufacturer,
                                ManufacturePartNumber=model.ManufacturePartNumber,
                                Quantity = model.Quantity,
                                Package = model.Package,
                                ProjectId = model.ProjectId,
                                Status = model.Status,
                                LockStatus = model.LockStatus,
                                LastUserId = model.LastUserId,
                                CreateDate = model.CreateDate,
                        };
                            _ctx.dsConnector.Add(ConnectorModel);
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
        public async Task<string> updateStatus(Connector model)
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
                            var entityUpdate = _ctx.dsConnector.FirstOrDefault(x => x.Id == model.Id);
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
        public async Task<string> receive(vmConnector model)
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
                            var entityUpdate = _ctx.dsConnector.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.LocationId = model.LocationId;
                                entityUpdate.Port = model.Port;
                                entityUpdate.TeiPartNumber = model.TeiPartNumber;
                                entityUpdate.Description = model.Description;
                                entityUpdate.Manufacturer = model.Manufacturer;
                                entityUpdate.Quantity = model.Quantity - model.ReceiveQuantity;
                                entityUpdate.ManufacturePartNumber = model.ManufacturePartNumber;
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
        public async Task<string> deleteById(int id)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        var idToRemove = _ctx.dsConnector.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.dsConnector.Remove(idToRemove);
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
