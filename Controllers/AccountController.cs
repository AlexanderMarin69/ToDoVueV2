using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Core;
using Microsoft.AspNetCore.Authorization;
using vueproject.ViewModels;
using Microsoft.AspNetCore.Identity;
using vueproject.Models;
using AutoMapper;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

namespace vueproject.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AccountController(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

       [HttpGet]
        public IActionResult IsUserLoggedIn()
        {
            if (User.Identity.IsAuthenticated)
                return Ok();
            return Unauthorized();
        }

        //[HttpGet]
        //[Authorize(Roles = "ADMIN")]
        //public async Task<IActionResult> GetAllCustomerUsers()
        //{
        //    IList<ApplicationUser> users = await _userManager.GetUsersInRoleAsync("PLAYERS");
        //    return Ok(users);
        //}

        //[HttpGet]
        //public async Task<IActionResult> GetLoggedUser()
        //{
        //    //TODO: MAKE NEW VM FFS!
        //    SettingsViewModel settingsViewModel = new SettingsViewModel();
        //    var usr = await _userManager.GetUserAsync(User);
        //    CustomerViewModel customer = await _customerService.GetById(usr.CustomerId);

        //    if (User.Identity.IsAuthenticated)
        //    {
        //        settingsViewModel.FirstName = customer.FirstName;
        //        settingsViewModel.LastName = customer.LastName;
        //        settingsViewModel.PhoneNumber = customer.PhoneNumber;
        //        settingsViewModel.CompanyName = customer.CompanyName;
        //        settingsViewModel.SelectedDeliveryAddressId = customer.SelectedDeliveryAddressId;
        //        settingsViewModel.SelectedInvoiceAddressId = customer.SelectedInvoiceAddressId;
        //        //registerUserViewModel.DeliveryAddress = customer.DeliveryAddressId;
        //        //registerUserViewModel.InvoiceAddress = customer.InvoiceAddressId;
        //        settingsViewModel.CustomerNumber = customer.CustomerNumber;
        //        settingsViewModel.Email = usr.Email;

        //        return Ok(settingsViewModel);
        //    }
        //    return Unauthorized();
        //}

        //[HttpPost]
        //public async Task<IActionResult> UpdateUser(CustomerViewModel vm)
        //{
        //    var usr = await _userManager.GetUserAsync(User);
        //    CustomerViewModel customer = await _customerService.GetById(usr.CustomerId);


        //    if (User.Identity.IsAuthenticated)
        //    {
        //        customer.LastName = vm.LastName;
        //        customer.FirstName = vm.FirstName;
        //        customer.PhoneNumber = vm.PhoneNumber;
        //        customer.CompanyName = vm.CompanyName;
        //        customer.SelectedDeliveryAddressId = vm.DeliveryAddressId;
        //        customer.SelectedInvoiceAddressId = vm.InvoiceAddressId;
        //        await _customerService.Update(customer);

        //        return Ok(customer);
        //    }
        //    return Unauthorized();
        //}

        //[HttpPost]
        //public async Task<IActionResult> ChangePassword(ChangePasswordViewModel vm)
        //{
        //    var usr = await _userManager.GetUserAsync(User);
        //    IdentityResult result = new IdentityResult();
        //    if (vm.NewPassword != null)
        //        result = await _userManager.ChangePasswordAsync(usr, vm.Password, vm.NewPassword);

        //    if (result.Succeeded)
        //        return Ok("Password changed");

        //    foreach (var error in result.Errors)
        //    {
        //        return BadRequest(error.Description);
        //    }

        //    return Ok();
        //}

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel vm)
        {

            //Username is the same as email
            var result = await _signInManager.PasswordSignInAsync(vm.Username,
            vm.Password, vm.RememberMe, lockoutOnFailure: true);

            if (result.Succeeded)
            {
                ////If we have redirect url we return the user to where he was before trying to login
                //if (vm.RedirectUrl != null || !String.IsNullOrWhiteSpace(vm.RedirectUrl))
                //{
                //    return Ok(vm.RedirectUrl);
                //}
                ////Else we just return the "home" route
                //else
                //{
                    return Ok("/");
                //}
            }

            if (result.IsLockedOut)
            {
                //Return a message to login view.
                return BadRequest("You are locked out. Please contact an administrator.");
            }
            else
            {
                //Change this to a proper statuscode.. perhaps 401
                return BadRequest("Invalid login attempt.");
            }
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Register(RegisterUserViewModel vm)
        {
            if (ModelState.IsValid)
            {


                //var customerId = await _customerService.Add(customer);



                //if (!string.IsNullOrEmpty(vm.DeliveryAddress))
                //{
                //    deliveryAddress = new DeliveryAddressViewModel
                //    {
                //        Address = vm.DeliveryAddress,
                //        City = vm.DeliveryCity,
                //        ZipCode = vm.DeliveryZipCode
                //    };

                //    deliveryAddressId = await _deliveryAddressService.Add(deliveryAddress, new Guid(user.Id));
                //}

                //Add things to user if not empty;) like when fill profile and things are optional

                //if (!string.IsNullOrEmpty(vm.InvoiceAddress))
                //{
                //    invoiceAddress = new InvoiceAddressViewModel
                //    {
                //        Address = vm.InvoiceAddress,
                //        City = vm.InvoiceCity,
                //        ZipCode = vm.InvoiceZipCode
                //    };

                //    invoiceAddressId = await _invoiceAddressService.Add(invoiceAddress, new Guid(user.Id));
                //}


                var user = new IdentityUser { UserName = vm.Email, Email = vm.Email};
                var result = await _userManager.CreateAsync(user, vm.Password);

                if (result.Succeeded)
                {
                    //TODO: add role choose some role mannen
                    //await _userManager.AddToRoleAsync(user, "player");
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return Ok();
                }

                foreach (var error in result.Errors)
                {
                    return BadRequest(error.Description);
                }
            }
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}