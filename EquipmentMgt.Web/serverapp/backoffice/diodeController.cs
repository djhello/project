using DataFactory.backoffice;
using DataModels.EntityModels;
using DataModels.ViewModels;
using DataUtilities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EquipmentMgt.Web.serverapp.backoffice
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class DiodeController : ControllerBase
    {
        private dbDiode _objDiode = null;
        private dbHardwareLog _objHardwareLogs = null;

        private IHostingEnvironment _hostingEnvironment;

        public DiodeController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/diode/getAll
        [HttpGet("[action]")]
        public async Task<List<vmDiode>> getAll()
        {
            List<vmDiode> diodes = null;
            try
            {
                _objDiode = new dbDiode();
                diodes = await _objDiode.getAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return diodes;
        }

        // GET api/diode/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<vmDiode> getById(int id)
        {
            vmDiode diode = null;
            try
            {
                _objDiode = new dbDiode();
                diode = await _objDiode.getById(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return diode;
        }

        // POST: api/diode/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Diode model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }

                _objDiode = new dbDiode();
                message = await _objDiode.create(model);
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
        // POST: api/users/updateStatus
        [HttpPost("[action]")]
        public async Task<object> updateStatus([FromBody]Diode model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objDiode = new dbDiode();
                message = await _objDiode.updateStatus(model);
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
        public async Task<object> receive([FromBody]vmDiode model)
        {
            object result = null; string message = string.Empty;
            HardwareLog hardwarelog = null;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objDiode = new dbDiode();
                _objHardwareLogs = new dbHardwareLog();

                message = await _objDiode.receive(model);
                if (message == MessageConstants.Saved)
                {
                    hardwarelog = new HardwareLog();
                    hardwarelog.HardwareClassId = (int)HardwareClass.Diode;
                    hardwarelog.HardwareId = model.Id;
                    hardwarelog.ReceiveQuantity = model.ReceiveQuantity;
                    hardwarelog.UserId = model.LastUserId;
                    hardwarelog.Status = model.Status;
                    hardwarelog.CreateDate = DateTime.Now;
                    hardwarelog.LockStatus = model.LockStatus;
                    message = await _objHardwareLogs.create(hardwarelog);
                }
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
        // DELETE api/diode/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objDiode = new dbDiode();
                message = await _objDiode.deleteById(id);
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