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
    public class MosfetController : ControllerBase
    {
        private Mosfets _objmosfet = null;
        private HardwareLogs _objHardwareLogs = null;

        private IHostingEnvironment _hostingEnvironment;

        public MosfetController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/mosfet/getall
        [HttpGet("[action]")]
        public async Task<List<vmMosfet>> getAll()
        {
            List<vmMosfet> mosfets = null;
            try
            {
                _objmosfet = new Mosfets();
                mosfets = await _objmosfet.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return mosfets;
        }

        // GET api/mosfet/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<vmMosfet> getbyid(int id)
        {
            vmMosfet mosfet = null;
            try
            {
                _objmosfet = new Mosfets();
                mosfet = await _objmosfet.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return mosfet;
        }

        // POST: api/mosfet/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Mosfet model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }

                _objmosfet = new Mosfets();
                message = await _objmosfet.create(model);
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
        public async Task<object> updateStatus([FromBody]Mosfet model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objmosfet = new Mosfets();
                message = await _objmosfet.updateStatus(model);
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
        public async Task<object> receive([FromBody]vmMosfet model)
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
                _objmosfet = new Mosfets();
                _objHardwareLogs = new HardwareLogs();

                message = await _objmosfet.receive(model);
                if (message == MessageConstants.Saved)
                {
                    hardwarelog = new HardwareLog();
                    hardwarelog.HardwareClassId = (int)HardwareClass.Mosfet;
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
        // DELETE api/mosfet/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objmosfet = new Mosfets();
                message = await _objmosfet.deletebyid(id);
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