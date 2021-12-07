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
    public class dashboardController : ControllerBase
    {
        private Dashboard _objdashboard = null;

        // GET: api/dashboard/getallsummary
        [HttpGet("[action]")]
        public async Task<vmSummary> getallsummary()
        {
            vmSummary summary = null;
            try
            {
                _objdashboard = new Dashboard();
                summary = await _objdashboard.getallsummary();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return summary;
        }
    }
}