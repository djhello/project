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
    public class InductorController : ControllerBase
    {
        private Inductors _objinductor = null;
        private HardwareLogs _objHardwareLogs = null;
        private IHostingEnvironment _hostingEnvironment;

        public InductorController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/inductor/getall
        [HttpGet("[action]")]
        public async Task<List<vmInductor>> getAll()
        {
            List<vmInductor> inductors = null;
            try
            {
                _objinductor = new Inductors();
                inductors = await _objinductor.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return inductors;
        }

        // GET api/inductor/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<vmInductor> getbyid(int id)
        {
            vmInductor inductor = null;
            try
            {
                _objinductor = new Inductors();
                inductor = await _objinductor.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return inductor;
        }

        // POST: api/inductor/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Inductor model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }

                _objinductor = new Inductors();
                message = await _objinductor.create(model);
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
        public async Task<object> updateStatus([FromBody]Inductor model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objinductor = new Inductors();
                message = await _objinductor.updateStatus(model);
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
        public async Task<object> receive([FromBody]vmInductor model)
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
                _objinductor = new Inductors();
                _objHardwareLogs = new HardwareLogs();

                message = await _objinductor.receive(model);
                if (message == MessageConstants.Saved)
                {
                    hardwarelog = new HardwareLog();
                    hardwarelog.HardwareClassId = (int)HardwareClass.Inductor;
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
        // DELETE api/inductor/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objinductor = new Inductors();
                message = await _objinductor.deletebyid(id);
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