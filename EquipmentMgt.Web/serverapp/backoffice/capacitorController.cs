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
    public class CapacitorController : ControllerBase
    {
        private Capacitors _objcapacitor = null;
        private HardwareLogs _objHardwareLogs = null;

        // GET: api/capacitor/getall
        [HttpGet("[action]")]
        public async Task<List<vmCapacitor>> getAll()
        {
            List<vmCapacitor> capacitors = null;
            try
            {
                _objcapacitor = new Capacitors();
                capacitors = await _objcapacitor.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return capacitors;
        }

        // GET api/capacitor/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<vmCapacitor> getbyid(int id)
        {
            vmCapacitor capacitor = null;
            try
            {
                _objcapacitor = new Capacitors();
                capacitor = await _objcapacitor.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return capacitor;
        }

        // POST: api/capacitor/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Capacitor model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }

                _objcapacitor = new Capacitors();
                message = await _objcapacitor.create(model);
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
        public async Task<object> updateStatus([FromBody]Capacitor model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objcapacitor = new Capacitors();
                message = await _objcapacitor.updateStatus(model);
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
        public async Task<object> receive([FromBody]vmCapacitor model)
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
                _objcapacitor = new Capacitors();
                _objHardwareLogs = new HardwareLogs();

                message = await _objcapacitor.receive(model);
                if(message == MessageConstants.Saved)
                {
                    hardwarelog = new HardwareLog();
                    hardwarelog.HardwareClassId = (int)HardwareClass.Capacitor;
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
        // DELETE api/capacitor/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objcapacitor = new Capacitors();
                message = await _objcapacitor.deletebyid(id);
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