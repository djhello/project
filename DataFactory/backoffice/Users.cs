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

        public async Task<List<vmUserDepartman>> getall()
        {
            List<vmUserDepartman> users = null;
            try
            {
                using (_ctx)
                {

                    users = await (from u in _ctx.User
                                   join d in _ctx.Departman on u.DepartmanId equals d.DepartmanId
                                   where u.Status==1
                                   select new vmUserDepartman
                                   {
                                       Id = u.Id,
                                       UserId = u.UserId,
                                       UserType = u.UserType,
                                       FirstName = u.FirstName,
                                       LastName = u.LastName,
                                       Email = u.Email,
                                       DepartmanId = u.DepartmanId,
                                       DepartmanName = d.DepartmanName
                                   }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return users;

        }
        public async Task<vmUserDepartman> getbyid(int id)
        {
            vmUserDepartman user = null;

            try
            {
                using (_ctx)
                {
                    user = await (from u in _ctx.User
                                  join d in _ctx.Departman on u.DepartmanId equals d.DepartmanId
                                  where u.UserId == id
                                  select new vmUserDepartman
                                  {
                                      Id = u.Id,
                                      UserId = u.UserId,
                                      UserType = u.UserType,
                                      FirstName = u.FirstName,
                                      LastName = u.LastName,
                                      Email = u.Email,
                                      DepartmanId = u.DepartmanId,
                                      DepartmanName = d.DepartmanName
                                  }).FirstOrDefaultAsync();
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
                        if (model.UserId > 0 && model.Id > 0)
                        {
                            var entityUpdate = _ctx.User.FirstOrDefault(x => x.UserId == model.UserId);
                            if (entityUpdate != null)
                            {
                                entityUpdate.FirstName = model.FirstName;
                                entityUpdate.LastName = model.LastName;
                                entityUpdate.DepartmanId = model.DepartmanId;
                                entityUpdate.Email = model.Email;
                                entityUpdate.Status = model.Status;
                                entityUpdate.LockStatus = model.LockStatus;
                                entityUpdate.CreateDate = model.CreateDate;
                                entityUpdate.LastUserId = model.LastUserId;
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
                                    UserType = (int) MemberType.Member,
                                    FirstName = model.FirstName,
                                    LastName = model.LastName,
                                    DepartmanId=model.DepartmanId,
                                    Status = model.Status,
                                    LockStatus = model.LockStatus,
                                    CreateDate = model.CreateDate,
                                    LastUserId = model.LastUserId,
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
        public async Task<string> updateStatus(vmUser model)
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
                                entityUpdate.Status = model.Status;
                                entityUpdate.LastUserId = model.LastUserId;
                                entityUpdate.CreateDate = model.CreateDate;
                                entityUpdate.LockStatus = model.LockStatus;
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
                                entityUpdate.FirstName = model.FirstName;
                                entityUpdate.LastName = model.LastName;
                                entityUpdate.DepartmanId = model.DepartmanId;
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
        public async Task<string> updatePasswordUrl(vmUser model)
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
                            var entityUpdate = _ctx.UserAuthentication.FirstOrDefault(x => x.Userid == model.UserId);
                            if (entityUpdate != null)
                            {
                                var UserAuthModel = new UserAuthentication
                                {
                                   Userpass = model.Password
                                };
                                _ctx.UserAuthentication.Add(UserAuthModel);

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
        public async Task<string> deletebyid(int userId)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        var idToRemove = _ctx.User.SingleOrDefault(x => x.UserId == userId);
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
