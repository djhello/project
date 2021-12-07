using DataFactory.backoffice;
using DataModels.EntityModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EquipmentMgt.Web.serverapp.backoffice
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class calibrationController : ControllerBase
    {
        private Calibrations _objcalibration = null;

        // GET: api/calibration/getall
        [HttpGet("[action]")]
        public async Task<List<Calibration>> getall()
        {
            List<Calibration> calibrations = null;
            try
            {
                _objcalibration = new Calibrations();
                calibrations = await _objcalibration.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return calibrations;
        }

        // GET api/calibration/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<Calibration> getbyid(int id)
        {
            Calibration calibration = null;
            try
            {
                _objcalibration = new Calibrations();
                calibration = await _objcalibration.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return calibration;
        }

        // POST: api/calibration/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Calibration model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }
                //Save
                _objcalibration = new Calibrations();
                message = await _objcalibration.create(model);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            result = new
            {
                message
            };

            return result;
        }

        // DELETE api/calibration/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objcalibration = new Calibrations();
                message = await _objcalibration.deletebyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            result = new
            {
                message
            };

            return result;
        }
    }
}