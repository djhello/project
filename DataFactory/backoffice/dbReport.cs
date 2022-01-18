using DataModels.EntityModels;
using DataModels.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataFactory.backoffice
{
    public class dbReport
    {
        private EquipmentDBContext _ctx = null;

        public dbReport()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<vmEquipmentchart>> getEquipmentChart()
        {
            List<vmEquipmentchart> echart = null;

            try
            {
                using (_ctx)
                {
                    echart = await (from p in _ctx.dsvmEquipment
                                    join c in _ctx.dsEquipmentIssueReturn on p.Id equals c.EquipmentId into g
                                    select new vmEquipmentchart
                                    {
                                        eid = p.Id,
                                        ename = p.EquipmentModel+ "-" + p.EquipmentName,
                                        nissue = g.Count()
                                    }).ToListAsync();

                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return echart;
        }

        public async Task<List<vmMemberchart>> getMemberChart()
        {
            List<vmMemberchart> mchart = null;

            try
            {
                using (_ctx)
                {
                    mchart = await (from p in _ctx.User
                                    join c in _ctx.dsvmEquipmentIssueReturn on p.Id equals c.UserId into g
                                    where p.Status == 1
                                    select new vmMemberchart
                                    {
                                        tid = p.Id,
                                        mname = p.FirstName,
                                        ntrans = g.Count()
                                    }).ToListAsync();

                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return mchart;
        }
    }
}
