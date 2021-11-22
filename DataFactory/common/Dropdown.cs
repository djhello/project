using DataModels.EntityModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataFactory.common
{
    public class Dropdown
    {
        private LibraryDBContext _ctx = null;

        public Dropdown()
        {
            _ctx = new LibraryDBContext();
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


        public async Task<List<Category>> getallcategory()
        {
            List<Category> categories = null;
            try
            {
                using (_ctx)
                {
                    categories = await (from ct in _ctx.Category
                                        select new Category
                                        {
                                         Id = ct.Id,
                                         Categoryname = ct.Categoryname
                                        }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return categories;
        }
    }
}
