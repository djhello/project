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
        private dbICregulator _objICregulator = null;
        private dbHardwareLog _objHardwareLogs = null;

        private IHostingEnvironment _hostingEnvironment;

        public ICregulatorController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/icregulator/getAll
        [HttpGet("[action]")]
        public async Task<List<vmICregulator>> getAll()
        {
            List<vmICregulator> icregulators = null;
            try
            {
                _objICregulator = new dbICregulator();
                icregulators = await _objICregulator.getAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return icregulators;
        }

        // GET api/icregulator/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<vmICregulator> getById(int id)
        {
            vmICregulator icregulator = null;
            try
            {
                _objICregulator = new dbICregulator();
                icregulator = await _objICregulator.getById(id);
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

                _objICregulator = new dbICregulator();
                message = await _objICregulator.create(model);
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
                _objICregulator = new dbICregulator();
                message = await _objICregulator.updateStatus(model);
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
                _objICregulator = new dbICregulator();
                _objHardwareLogs = new dbHardwareLog();

                message = await _objICregulator.receive(model);
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
        // DELETE api/icregulator/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objICregulator = new dbICregulator();
                message = await _objICregulator.deleteById(id);
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