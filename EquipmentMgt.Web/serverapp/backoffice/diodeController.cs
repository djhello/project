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
        private Diodes _objdiode = null;
        private HardwareLogs _objHardwareLogs = null;

        private IHostingEnvironment _hostingEnvironment;

        public DiodeController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/diode/getall
        [HttpGet("[action]")]
        public async Task<List<vmDiode>> getAll()
        {
            List<vmDiode> diodes = null;
            try
            {
                _objdiode = new Diodes();
                diodes = await _objdiode.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return diodes;
        }

        // GET api/diode/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<vmDiode> getbyid(int id)
        {
            vmDiode diode = null;
            try
            {
                _objdiode = new Diodes();
                diode = await _objdiode.getbyid(id);
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

                _objdiode = new Diodes();
                message = await _objdiode.create(model);
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
                _objdiode = new Diodes();
                message = await _objdiode.updateStatus(model);
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
                _objdiode = new Diodes();
                _objHardwareLogs = new HardwareLogs();

                message = await _objdiode.receive(model);
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
        // DELETE api/diode/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objdiode = new Diodes();
                message = await _objdiode.deletebyid(id);
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