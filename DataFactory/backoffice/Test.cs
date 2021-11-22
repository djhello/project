using DataModels.EntityModels;
using DataModels.ViewModels;
using DataUtilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataFactory.backoffice
{
    public class Tests
    {
        private LibraryDBContext _ctx = null;

        public Tests()
        {
            _ctx = new LibraryDBContext();
        }

        public async Task<List<vmTest>> getall()
        {
            List<vmTest> testList = null;

            try
            {
                using (_ctx)
                {
                    testList = await (from t in _ctx.Test
                                   
                                   select new vmTest
                                   {
                                       Id = t.id,
                                       Name = t.name,
                                       Date = t.date
                                   }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return testList;
        }

        public async Task<Test> getbyid(int id)
        {
            Test test = null;

            try
            {
                using (_ctx)
                {
                    test = await _ctx.Test.FirstOrDefaultAsync(x =>x.id ==id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return test;
        }

        public async Task<string> create(Test model)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        if (model.id > 0)
                        {
                            //Update Author
                            var entityUpdate = _ctx.Test.FirstOrDefault(x => x.id == model.id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.name = model.name;
                                entityUpdate.date = model.date;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                            var maxId = _ctx.Test.DefaultIfEmpty().Max(x => x == null ? 0 : x.id) + 1;

                            //Save Book
                            var TestModel = new Test
                            {
                                id = maxId,
                                name = model.name,
                                date = model.date
                            };
                            _ctx.Test.Add(TestModel);
                            await _ctx.SaveChangesAsync();
                        }

                        _ctxTransaction.Commit();
                        message = MessageConstants.Saved;
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback();
                        e.ToString();
                        message = MessageConstants.SavedWarning;
                    }
                }
            }

            return message;
        }

        public async Task<string> deletebyid(int id)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        var idToRemove = _ctx.Test.SingleOrDefault(x => x.id == id);
                        if (idToRemove != null)
                        {
                            _ctx.Test.Remove(idToRemove);
                            await _ctx.SaveChangesAsync();
                        }
                        _ctxTransaction.Commit();
                        message = MessageConstants.Deleted;
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback();
                        e.ToString();
                        message = MessageConstants.DeletedWarning;
                    }
                }
            }

            return message;
        }
    }
}
