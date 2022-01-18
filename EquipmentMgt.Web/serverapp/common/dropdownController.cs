using DataFactory.common;
using DataModels.EntityModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EquipmentMgt.Web.serverapp.common
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class DropdownController : ControllerBase
    {
        private dbDropdown _objDropdown = null;

        // GET: api/dropdown/getAllCalibration
        [HttpGet("[action]")]
        public async Task<List<Calibration>> getAllCalibration()
        {
            List<Calibration> calibrations = null;
            try
            {
                _objDropdown = new dbDropdown();
                calibrations = await _objDropdown.getAllCalibration();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return calibrations;
        }
    }
}