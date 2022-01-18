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
    public class TransistorController : ControllerBase
    {
        private dbTransistor _objTransistor = null;
        private dbHardwareLog _objHardwareLogs = null;
        private IHostingEnvironment _hostingEnvironment;

        public TransistorController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/transistor/getAll
        [HttpGet("[action]")]
        public async Task<List<vmTransistor>> getAll()
        {
            List<vmTransistor> transistors = null;
            try
            {
                _objTransistor = new dbTransistor();
                transistors = await _objTransistor.getAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return transistors;
        }

        // GET api/transistor/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<vmTransistor> getById(int id)
        {
            vmTransistor transistor = null;
            try
            {
                _objTransistor = new dbTransistor();
                transistor = await _objTransistor.getById(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return transistor;
        }

        // POST: api/transistor/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Transistor model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }

                _objTransistor = new dbTransistor();
                message = await _objTransistor.create(model);
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
        public async Task<object> receive([FromBody]vmTransistor model)
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
                _objTransistor = new dbTransistor();
                _objHardwareLogs = new dbHardwareLog();

                message = await _objTransistor.receive(model);
                if (message == MessageConstants.Saved)
                {
                    hardwarelog = new HardwareLog();
                    hardwarelog.HardwareClassId = (int)HardwareClass.Transistor;
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
        // POST: api/users/updateStatus
        [HttpPost("[action]")]
        public async Task<object> updateStatus([FromBody]Transistor model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objTransistor = new dbTransistor();
                message = await _objTransistor.updateStatus(model);
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
        // DELETE api/transistor/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objTransistor = new dbTransistor();
                message = await _objTransistor.deleteById(id);
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