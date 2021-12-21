using DataModels.EntityModels;
using DataModels.ViewModels;
using DataUtilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;


namespace DataFactory.account
{
    public class AuthUsers
    {
        private EquipmentDBContext _ctx = null;

        public AuthUsers()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<string> regUsers(vmUser model)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                   
                    try
                    {
                        var ifEMailExist = _ctx.User.SingleOrDefault(x => x.Email == model.Email);
                        var ifUserIdExist = _ctx.User.SingleOrDefault(x => x.UserId == model.UserId);
                        if (ifEMailExist == null && ifUserIdExist == null)
                        {
                            var UserModel = new User
                            {
                                UserId = model.UserId,
                                UserType = (int) MemberType.Member,
                                FirstName = model.FirstName,
                                LastName = model.LastName,
                                DepartmanId=model.DepartmanId,
                                Email = model.Email
                            };
                            _ctx.User.Add(UserModel);

                           
                            //Save UserAuth
                            var UserAuthModel = new UserAuthentication
                            {
                                UserId = model.UserId,
                                UserName = model.Email,
                                UserPass = model.Password,
                                JoinDate = Extension.Today
                            };
                            _ctx.UserAuthentication.Add(UserAuthModel);

                            await _ctx.SaveChangesAsync();

                            message = MessageConstants.Saved;
                        }
                        else
                        {
                            message = MessageConstants.Exist;
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

        public async Task<vmLoggeduser> loginUsers(UserAuthentication model)
        {
            string message = string.Empty;
            vmLoggeduser loggedUser = null;

            using (_ctx)
            {
                try
                {
                    var ifExist = _ctx.UserAuthentication.SingleOrDefault(x => x.UserName == model.UserName);
                    if (ifExist != null)
                    {
                            loggedUser = await (from ua in _ctx.UserAuthentication
                                                join ur in _ctx.User on ua.UserId equals ur.UserId
                                                where ua.UserName == model.UserName
                                                select new vmLoggeduser
                                                {
                                                    UserId = ua.UserId,
                                                    UserName = ua.UserName,
                                                    UserType = ur.UserType,
                                                    DepartmanId = ur.DepartmanId,
                                                    DisplayName = ur.FirstName + " " + ur.LastName,
                                                    Email = ur.Email
                                                }).FirstOrDefaultAsync();

                        
                    }
                }
                catch (Exception e)
                {
                    e.ToString();
                    message = MessageConstants.AuthWarning;
                }
            }

            return loggedUser;
        }
        public async Task<UserAuthentication> checkPassword(UserAuthentication model)
        {
            string message = string.Empty;
            UserAuthentication loggedUser = null;
            
            using (_ctx)
            {
                try
                {
                    var ifExist = _ctx.UserAuthentication.SingleOrDefault(x => x.UserName == model.UserName);
                    if (ifExist != null)
                    {
                        if (ifExist != null)
                        {
                           loggedUser = await (from ua in _ctx.UserAuthentication
                                                join ur in _ctx.User on ua.UserId equals ur.UserId
                                                select new UserAuthentication
                                                {
                                                    UserName=ua.UserName,
                                                    UserPass=ua.UserPass
                                                }).FirstOrDefaultAsync();

                        }
                    }
                }
                catch (Exception e)
                {
                    e.ToString();
                    message = MessageConstants.AuthWarning;
                }
            }

            return loggedUser;
        }
    }
}
