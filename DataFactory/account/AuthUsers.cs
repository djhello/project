using DataModels.EntityModels;
using DataModels.ViewModels;
using DataUtilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DataFactory.account
{
    public class AuthUsers
    {
        private EquipmentDBContext _ctx = null;

        public AuthUsers()
        {
            _ctx = new EquipmentDBContext();
        }

        public async Task<string> regusers(vmUser model)
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

        public async Task<vmLoggeduser> loginusers(UserAuthentication model)
        {
            string message = string.Empty;
            vmLoggeduser loggeduser = null;

            using (_ctx)
            {
                try
                {
                    var ifExist = _ctx.UserAuthentication.SingleOrDefault(x => x.Username == model.Username && x.Userpass == model.Userpass);
                    if (ifExist != null)
                    {
                        loggeduser = await (from ua in _ctx.UserAuthentication
                                            join ur in _ctx.User on ua.Userid equals ur.UserId
                                            where ua.Username == model.Username
                                            select new vmLoggeduser
                                            {
                                                Userid = ua.Userid,
                                                Username = ua.Username,
                                                Usertype = ur.UserType,
                                                Displayname = ur.FirstName+" "+ur.LastName,
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

            return loggeduser;
        }
    }
}
