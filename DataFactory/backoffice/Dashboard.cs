using DataModels.EntityModels;
using DataModels.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DataFactory.backoffice
{
    public class Dashboard
    {
        private EquipmentDBContext _ctx = null;

        public Dashboard()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<vmSummary> getallsummary()
        {
            vmSummary summary = null;

            try
            {
                using (_ctx)
                {
                    var tmember = await (from u in _ctx.User select u).CountAsync();
                    var eEquipment = await (from b in _ctx.Equipment select b).CountAsync();
                    var tissued = await (from i in _ctx.EquipmentIssueReturn
                                         where i.Status == false
                                         select i).CountAsync();
                    var treturn = await (from r in _ctx.EquipmentIssueReturn
                                         where r.Status == true
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
