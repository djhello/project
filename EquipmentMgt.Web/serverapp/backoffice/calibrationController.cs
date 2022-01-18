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
    public class CalibrationController : ControllerBase
    {
        private dbCalibration _objCalibration = null;

        // GET: api/calibration/getAll
        [HttpGet("[action]")]
        public async Task<List<Calibration>> getAll()
        {
            List<Calibration> calibrations = null;
            try
            {
                _objCalibration = new dbCalibration();
                calibrations = await _objCalibration.getAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return calibrations;
        }

        // GET api/calibration/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<Calibration> getById(int id)
        {
            Calibration calibration = null;
            try
            {
                _objCalibration = new dbCalibration();
                calibration = await _objCalibration.getById(id);
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
                _objCalibration = new dbCalibration();
                message = await _objCalibration.create(model);
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
        [HttpPost("[action]")]
        public async Task<object> updateStatus([FromBody]Calibration model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objCalibration = new dbCalibration();
                message = await _objCalibration.updateStatus(model);
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
        // DELETE api/calibration/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objCalibration = new dbCalibration();
                message = await _objCalibration.deleteById(id);
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