using DataFactory.backoffice;
using DataModels.EntityModels;
using DataModels.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EquipmentMgt.Web.serverapp.backoffice
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class CirculationController : ControllerBase
    {
        private dbCirculation _objCirculation = null;

        #region --Return
        // GET: api/circulation/getreturnall
        [HttpGet("[action]")]
        public async Task<List<vmEquipmentIssueReturn>> getReturnAll()
        {
            List<vmEquipmentIssueReturn> equipmentIssuereturn = null;
            try
            {
                _objCirculation = new dbCirculation();
                equipmentIssuereturn = await _objCirculation.getReturnAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipmentIssuereturn;
        }

        // GET api/circulation/getReturnById/1
        [HttpGet("[action]/{id}")]
        public async Task<List<vmEquipmentIssueReturn>> getReturnById(int id)
        {
            List<vmEquipmentIssueReturn> equipmentIssuereturn = null;
            try
            {
                _objCirculation = new dbCirculation();
                equipmentIssuereturn = await _objCirculation.getReturnById(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipmentIssuereturn;
        }

        // POST: api/circulation/returnEquipment
        [HttpPost("[action]")]
        public async Task<object> returnEquipment([FromBody] EquipmentIssueReturn model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //var equipmentReturned = JsonConvert.DeserializeObject<EquipmentIssueReturn>(model.ToString());
                //Save
                _objCirculation = new dbCirculation();
                message = await _objCirculation.returnEquipment(model);
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
        #endregion


        #region --Issue
        // GET: api/circulation/getIssueAll
        [HttpGet("[action]")]
        public async Task<List<vmEquipmentIssueReturn>> getIssueAll()
        {
            List<vmEquipmentIssueReturn> equipmentIssueissue = null;
            try
            {
                _objCirculation = new dbCirculation();
                equipmentIssueissue = await _objCirculation.getIssueAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipmentIssueissue;
        }

        // GET api/circulation/getIssueById/1
        [HttpGet("[action]/{id}")]
        public async Task<List<vmEquipmentIssueReturn>> getIssueById(int id)
        {
            List<vmEquipmentIssueReturn> equipmentIssueissueList = null;
            try
            {
                _objCirculation = new dbCirculation();
                equipmentIssueissueList = await _objCirculation.getIssueById(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipmentIssueissueList;
        }


        // POST: api/circulation/issueEquipment
        [HttpPost("[action]")]
        public async Task<object> issueEquipment([FromBody] object model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                var equipmentIssued = JsonConvert.DeserializeObject<EquipmentIssueReturn>(model.ToString());

                //Save
                _objCirculation = new dbCirculation();
                message = await _objCirculation.issueEquipment(equipmentIssued);
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
        #endregion
    }
}