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
    public class ICregulatorController : ControllerBase
    {
        private ICregulators _objicregulator = null;
        private HardwareLogs _objHardwareLogs = null;

        private IHostingEnvironment _hostingEnvironment;

        public ICregulatorController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/icregulator/getall
        [HttpGet("[action]")]
        public async Task<List<vmICregulator>> getAll()
        {
            List<vmICregulator> icregulators = null;
            try
            {
                _objicregulator = new ICregulators();
                icregulators = await _objicregulator.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return icregulators;
        }

        // GET api/icregulator/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<vmICregulator> getbyid(int id)
        {
            vmICregulator icregulator = null;
            try
            {
                _objicregulator = new ICregulators();
                icregulator = await _objicregulator.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return icregulator;
        }

        // POST: api/icregulator/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]ICregulator model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }

                _objicregulator = new ICregulators();
                message = await _objicregulator.create(model);
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
        public async Task<object> updateStatus([FromBody]ICregulator model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objicregulator = new ICregulators();
                message = await _objicregulator.updateStatus(model);
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
        public async Task<object> receive([FromBody]vmICregulator model)
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
                _objicregulator = new ICregulators();
                _objHardwareLogs = new HardwareLogs();

                message = await _objicregulator.receive(model);
                if (message == MessageConstants.Saved)
                {
                    hardwarelog = new HardwareLog();
                    hardwarelog.HardwareClassId = (int)HardwareClass.ICregulator;
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
        // DELETE api/icregulator/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objicregulator = new ICregulators();
                message = await _objicregulator.deletebyid(id);
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