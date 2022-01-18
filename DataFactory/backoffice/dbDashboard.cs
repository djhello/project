using DataModels.EntityModels;
using DataModels.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DataFactory.backoffice
{
    public class dbDashboard
    {
        private EquipmentDBContext _ctx = null;

        public dbDashboard()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<vmSummary> getAllSummary()
        {
            vmSummary summary = null;

            try
            {
                using (_ctx)
                {
                    var tmember = await (from u in _ctx.User where u.Status==1 select u).CountAsync();
                    var eEquipment = await (from b in _ctx.dsEquipment select b).CountAsync();
                    var tissued = await (from i in _ctx.dsEquipmentIssueReturn
                                         where i.IsReturn == false
                                         select i).CountAsync();
                    var treturn = await (from r in _ctx.dsEquipmentIssueReturn
                                         where r.IsReturn == true
                                         select r).CountAsync();

                    summary = new vmSummary()
                    {
                        totalEquipment = eEquipment,
                        totalMember = tmember,
                        totalIssued = tissued,
                        totalReturned = treturn
                    };
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return summary;
        }
    }
}
