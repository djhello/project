﻿using DataFactory.common;
using DataModels.EntityModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryMgt.Web.serverapp.common
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class dropdownController : ControllerBase
    {
        private Dropdown _objddl = null;

        // GET: api/dropdown/getallauthor
        [HttpGet("[action]")]
        public async Task<List<Calibration>> getallcalibration()
        {
            List<Calibration> calibrations = null;
            try
            {
                _objddl = new Dropdown();
                calibrations = await _objddl.getallcalibration();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return calibrations;
        }

        // GET: api/dropdown/getallcategory
        [HttpGet("[action]")]
        public async Task<List<Category>> getallcategory()
        {
            List<Category> categories = null;
            try
            {
                _objddl = new Dropdown();
                categories = await _objddl.getallcategory();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return categories;
        }
    }
}