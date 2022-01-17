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
        private Connectors _objconnector = null;
        private HardwareLogs _objHardwareLogs = null;

        private IHostingEnvironment _hostingEnvironment;

        public ConnectorController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/connector/getall
        [HttpGet("[action]")]
        public async Task<List<vmConnector>> getAll()
        {
            List<vmConnector> connectors = null;
            try
            {
                _objconnector = new Connectors();
                connectors = await _objconnector.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return connectors;
        }

        // GET api/connector/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<vmConnector> getbyid(int id)
        {
            vmConnector connector = null;
            try
            {
                _objconnector = new Connectors();
                connector = await _objconnector.getbyid(id);
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

                _objconnector = new Connectors();
                message = await _objconnector.create(model);
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
                _objconnector = new Connectors();
                message = await _objconnector.updateStatus(model);
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
                _objconnector = new Connectors();
                _objHardwareLogs = new HardwareLogs();

                message = await _objconnector.receive(model);
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
        // DELETE api/connector/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objconnector = new Connectors();
                message = await _objconnector.deletebyid(id);
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