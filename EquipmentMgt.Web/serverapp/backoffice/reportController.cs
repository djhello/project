using DataFactory.backoffice;
using DataModels.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EquipmentMgt.Web.serverapp.backoffice
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class reportController : ControllerBase
    {
        private Report _objchart = null;

        // GET: api/report/getequipmentchart
        [HttpGet("[action]")]
        public async Task<List<vmEquipmentchart>> getequipmentchart()
        {
            List<vmEquipmentchart> bchart = null;
            try
            {
                _objchart = new Report();
                bchart = await _objchart.getequipmentchart();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return bchart;
        }

        // GET: api/report/getmemberchart
        [HttpGet("[action]")]
        public async Task<List<vmMemberchart>> getmemberchart()
        {
            List<vmMemberchart> mchart = null;
            try
            {
                _objchart = new Report();
                mchart = await _objchart.getmemberchart();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return mchart;
        }
    }
}