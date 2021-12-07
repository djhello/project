using DataModels.EntityModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataLayer.common
{
    public class Dropdown
    {
        private EquipmentDBContext _ctx = null;

        public Dropdown()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<Calibration>> getallcalibration()
        {
            List<Calibration> calibrations = null;
            try
            {
                using (_ctx)
                {
                    calibrations = await (from au in _ctx.Calibration
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
