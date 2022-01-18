using DataModels.EntityModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataFactory.common
{
    public class dbDropdown
    {
        private EquipmentDBContext _ctx = null;

        public dbDropdown()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<Calibration>> getAllCalibration()
        {
            List<Calibration> calibrations = null;
            try
            {
                using (_ctx)
                {
                    calibrations = await (from au in _ctx.dsCalibration
                                     select new Calibration
                                     {
                                         Id = au.Id,
                                         CalibrationName = au.CalibrationName
                                     }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return calibrations;
        }
    }
}
