using DataFactory.backoffice;
using DataModels.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace EquipmentMgt.Web.serverapp.backoffice
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private dbDashboard _objDashboard = null;

        // GET: api/dashboard/getAllSummary
        [HttpGet("[action]")]
        public async Task<vmSummary> getAllSummary()
        {
            vmSummary summary = null;
            try
            {
                _objDashboard = new dbDashboard();
                summary = await _objDashboard.getAllSummary();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return summary;
        }
    }
}