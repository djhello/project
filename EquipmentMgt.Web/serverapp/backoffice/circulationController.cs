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
    public class circulationController : ControllerBase
    {
        private Circulation _objcirculation = null;

        #region --Return
        // GET: api/circulation/getreturnall
        [HttpGet("[action]")]
        public async Task<List<vmEquipmentIssuereturn>> getreturnall()
        {
            List<vmEquipmentIssuereturn> equipmentIssuereturn = null;
            try
            {
                _objcirculation = new Circulation();
                equipmentIssuereturn = await _objcirculation.getreturnall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipmentIssuereturn;
        }

        // GET api/circulation/getreturnbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<List<vmEquipmentIssuereturn>> getreturnbyid(int id)
        {
            List<vmEquipmentIssuereturn> equipmentIssuereturn = null;
            try
            {
                _objcirculation = new Circulation();
                equipmentIssuereturn = await _objcirculation.getreturnbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipmentIssuereturn;
        }

        // POST: api/circulation/returnequipment
        [HttpPost("[action]")]
        public async Task<object> returnequipment([FromBody] EquipmentIssueReturn model)
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
                _objcirculation = new Circulation();
                message = await _objcirculation.returnequipment(model);
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
        // GET: api/circulation/getissueall
        [HttpGet("[action]")]
        public async Task<List<vmEquipmentIssuereturn>> getissueall()
        {
            List<vmEquipmentIssuereturn> equipmentIssueissue = null;
            try
            {
                _objcirculation = new Circulation();
                equipmentIssueissue = await _objcirculation.getissueall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipmentIssueissue;
        }

        // GET api/circulation/getissuebyid/1
        [HttpGet("[action]/{id}")]
        public async Task<List<vmEquipmentIssuereturn>> getissuebyid(int id)
        {
            List<vmEquipmentIssuereturn> equipmentIssueissueList = null;
            try
            {
                _objcirculation = new Circulation();
                equipmentIssueissueList = await _objcirculation.getissuebyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipmentIssueissueList;
        }

        
        // POST: api/circulation/issuebook
        [HttpPost("[action]")]
        public async Task<object> issueequipment([FromBody] object model)
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
                _objcirculation = new Circulation();
                message = await _objcirculation.issueequipment(equipmentIssued);
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