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
    public class ResistorController : ControllerBase
    {
        private Resistors _objresistor = null;
        private HardwareLogs _objHardwareLogs = null;

        private IHostingEnvironment _hostingEnvironment;

        public ResistorController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/resistor/getall
        [HttpGet("[action]")]
        public async Task<List<vmResistor>> getAll()
        {
            List<vmResistor> resistors = null;
            try
            {
                _objresistor = new Resistors();
                resistors = await _objresistor.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return resistors;
        }

        // GET api/resistor/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<vmResistor> getbyid(int id)
        {
            vmResistor resistor = null;
            try
            {
                _objresistor = new Resistors();
                resistor = await _objresistor.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return resistor;
        }

        // POST: api/resistor/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Resistor model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }

                _objresistor = new Resistors();
                message = await _objresistor.create(model);
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
        public async Task<object> updateStatus([FromBody]Resistor model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objresistor = new Resistors();
                message = await _objresistor.updateStatus(model);
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
        public async Task<object> receive([FromBody]vmResistor model)
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
                _objresistor = new Resistors();
                _objHardwareLogs = new HardwareLogs();

                message = await _objresistor.receive(model);
                if (message == MessageConstants.Saved)
                {
                    hardwarelog = new HardwareLog();
                    hardwarelog.HardwareClassId = (int)HardwareClass.Resistor;
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
        // DELETE api/resistor/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objresistor = new Resistors();
                message = await _objresistor.deletebyid(id);
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