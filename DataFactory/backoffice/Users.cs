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
    public class Users
    {
        private EquipmentDBContext _ctx = null;

        public Users()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<List<User>> getall()
        {
            List<User> users = null;
            try
            {
                using (_ctx)
                {
                    users = await _ctx.User.ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return users;
        }

        public async Task<User> getbyid(int id)
        {
            User user = null;

            try
            {
                using (_ctx)
                {
                    user = await _ctx.User.FirstOrDefaultAsync(x => x.Id == id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return user;
        }

        public async Task<string> create(vmUser model)
        {
            string message = string.Empty;
            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        if (model.Id > 0)
                        {
                            var entityUpdate = _ctx.User.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.Firstname = model.Firstname;
                                entityUpdate.Lastname = model.Lastname;
                                entityUpdate.Email = model.Email;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                            var ifExist = _ctx.User.SingleOrDefault(x => x.Email == model.Email);
                            if (ifExist == null)
                            {
                                var UserModel = new User
                                {
                                    UserId = model.UserId,
                                    Usertype = (int) MemberType.Member,
                                    Firstname = model.Firstname,
                                    Lastname = model.Lastname,
                                    Email = model.Email
                                };
                                _ctx.User.Add(UserModel);


                                //Save UserAuth
                                var UserAuthModel = new UserAuthentication
                                {
                                    Userid = model.UserId,
                                    Username = model.Email,
                                    Userpass = model.Password,
                                    Joindate = Extension.Today
                                };
                                _ctx.UserAuthentication.Add(UserAuthModel);

                                await _ctx.SaveChangesAsync();

                                message = MessageConstants.Saved;
                            }
                            else
                            {
                                message = MessageConstants.Exist;
                            }
                        }
                        _ctxTransaction.Commit();
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
        public async Task<string> updateUserInfos(vmUser model)
        {
            string message = string.Empty;
            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        if (model.UserId > 0)
                        {
                            var entityUpdate = _ctx.User.FirstOrDefault(x => x.UserId == model.UserId);
                            if (entityUpdate != null)
                            {
                                entityUpdate.Firstname = model.Firstname;
                                entityUpdate.Lastname = model.Lastname;
                                entityUpdate.Email = model.Email;
                                await _ctx.SaveChangesAsync();
                                message = MessageConstants.Saved;
                            }
                        }
                        _ctxTransaction.Commit();
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
                        var idToRemove = _ctx.User.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.User.Remove(idToRemove);
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
