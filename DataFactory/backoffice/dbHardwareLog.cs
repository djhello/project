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
    public class dbHardwareLog
    {
        private EquipmentDBContext _ctx = null;

        public dbHardwareLog()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<HardwareLog>> getAll()
        {
            List<HardwareLog> hardwareLogList = null;

            try
            {
                using (_ctx)
                {
                    hardwareLogList = await (from t in _ctx.dsHardwareLog
                                             where t.Status == 1
                                             select new HardwareLog
                                             {
                                                 Id = t.Id,
                                                 HardwareClassId = t.HardwareClassId,
                                                 HardwareId = t.HardwareId,
                                                 UserId = t.UserId,
                                                 ReceiveQuantity = t.ReceiveQuantity,
                                                 LastUserId = t.LastUserId,
                                                 Status = t.Status,
                                                 CreateDate = t.CreateDate,
                                                 LockStatus = t.LockStatus
                                             }
                                          ).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return hardwareLogList;
        }

        public async Task<HardwareLog> getById(int id)
        {
            HardwareLog location = null;

            try
            {
                using (_ctx)
                {
                    location = await _ctx.dsHardwareLog.FirstOrDefaultAsync(x =>x.Id ==id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return location;
        }

        public async Task<string> create(HardwareLog model)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                            var hardwareLogModel = new HardwareLog
                            {
                                HardwareClassId = model.HardwareClassId,
                                HardwareId = model.HardwareId,
                                ReceiveQuantity = model.ReceiveQuantity,
                                UserId = model.UserId,
                                Status = model.Status,
                                LastUserId = model.LastUserId,
                                CreateDate = model.CreateDate,
                                LockStatus = model.LockStatus
                            };
                        
                            _ctx.dsHardwareLog.Add(hardwareLogModel);
                            await _ctx.SaveChangesAsync();
                        

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
        public async Task<string> updateStatus(HardwareLog model)
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
                            var entityUpdate = _ctx.dsHardwareLog.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.Status = model.Status;
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
                        var idToRemove = _ctx.dsHardwareLog.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.dsHardwareLog.Remove(idToRemove);
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
