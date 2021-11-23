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
    public class Calibrations
    {
        private EquipmentDBContext _ctx = null;

        public Calibrations()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<Calibration>> getall()
        {
            List<Calibration> calibrations = null;

            try
            {
                using (_ctx)
                {
                    calibrations = await _ctx.Calibration.ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return calibrations;
        }

        public async Task<Calibration> getbyid(int id)
        {
            Calibration calibration = null;

            try
            {
                using (_ctx)
                {
                    calibration = await _ctx.Calibration.FirstOrDefaultAsync(x => x.Id == id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return calibration;
        }

        public async Task<string> create(Calibration model)
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
                            //Update Calibration
                            var entityUpdate = _ctx.Calibration.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.CalibrationName = model.CalibrationName;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                            //var maxId = _ctx.Calibration.DefaultIfEmpty().Max(x => x == null ? 0 : x.Id) + 1;

                            //Save Author
                            var CalibrationrModel = new Calibration
                            {
                                //Id = maxId,
                                CalibrationName = model.CalibrationName
                            };
                            _ctx.Calibration.Add(CalibrationrModel);
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
                        var idToRemove = _ctx.Calibration.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.Calibration.Remove(idToRemove);
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
