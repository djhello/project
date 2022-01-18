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
    public class ConnectorController : ControllerBase
    {
        private dbConnector _objConnector = null;
        private dbHardwareLog _objHardwareLogs = null;

        private IHostingEnvironment _hostingEnvironment;

        public ConnectorController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/connector/getAll
        [HttpGet("[action]")]
        public async Task<List<vmConnector>> getAll()
        {
            List<vmConnector> connectors = null;
            try
            {
                _objConnector = new dbConnector();
                connectors = await _objConnector.getAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return connectors;
        }

        // GET api/connector/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<vmConnector> getById(int id)
        {
            vmConnector connector = null;
            try
            {
                _objConnector = new dbConnector();
                connector = await _objConnector.getById(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return connector;
        }

        // POST: api/connector/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Connector model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }

                _objConnector = new dbConnector();
                message = await _objConnector.create(model);
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
        public async Task<object> updateStatus([FromBody]Connector model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objConnector = new dbConnector();
                message = await _objConnector.updateStatus(model);
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
        public async Task<object> receive([FromBody]vmConnector model)
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
                _objConnector = new dbConnector();
                _objHardwareLogs = new dbHardwareLog();

                message = await _objConnector.receive(model);
                if (message == MessageConstants.Saved)
                {
                    hardwarelog = new HardwareLog();
                    hardwarelog.HardwareClassId = (int)HardwareClass.Connector;
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
        // DELETE api/connector/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objConnector = new dbConnector();
                message = await _objConnector.deleteById(id);
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