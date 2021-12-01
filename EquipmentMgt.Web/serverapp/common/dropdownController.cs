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
    public class dropdownController : ControllerBase
    {
        private Dropdown _objddl = null;

        // GET: api/dropdown/getallcalibration
        [HttpGet("[action]")]
        public async Task<List<Calibration>> getallcalibration()
        {
            List<Calibration> calibrations = null;
            try
            {
                _objddl = new Dropdown();
                calibrations = await _objddl.getallcalibration();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return calibrations;
        }
    }
}