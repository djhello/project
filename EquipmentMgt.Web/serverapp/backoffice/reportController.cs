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
    public class ReportController : ControllerBase
    {
        private dbReport _objChart = null;

        // GET: api/report/getEquipmentChart
        [HttpGet("[action]")]
        public async Task<List<vmEquipmentchart>> getEquipmentChart()
        {
            List<vmEquipmentchart> bchart = null;
            try
            {
                _objChart = new dbReport();
                bchart = await _objChart.getEquipmentChart();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return bchart;
        }

        // GET: api/report/getMemberChart
        [HttpGet("[action]")]
        public async Task<List<vmMemberchart>> getMemberChart()
        {
            List<vmMemberchart> mchart = null;
            try
            {
                _objChart = new dbReport();
                mchart = await _objChart.getMemberChart();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return mchart;
        }
    }
}