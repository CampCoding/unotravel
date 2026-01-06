"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import Modal from "@/components/shared/Modal/Modal";
import { Input } from "antd";
import { Eye, EyeOff, Trash } from "lucide-react"; // <-- add EyeOff
import React, { useEffect } from "react";

export default function ProfileSettingsModal({ open, setOpen }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <Modal
      className="!rounded-xl  !mt-20 !pt-[30px] !bg-[#F5F6FA] max-w-[800px]"
      open={open}
      setOpen={setOpen}
    >
      <div className="container">
        <div className="mx-auto w-fit">
          <CustomHeading first_title="Profile" second_title="Settings" />
        </div>

        <div className="grid mt-10 grid-cols-2 gap-[30px]">
          <div className="flex gap-[10px] 2xl:!gap-[17px] flex-col">
            <label className="italic text-[#264787] text-base 2xl:text-[19px]">
              Full Name
            </label>
            <input className="p-[14px_20px] 2xl:!p-[20px_35px] text-[#264787] outline-none focus:outline-none bg-white px-3 !rounded-xl" />
          </div>

          <div className="flex gap-[10px] 2xl:!gap-[17px] flex-col">
            <label className="italic text-[#264787] text-base 2xl:text-[19px]">
              Mobile Number
            </label>
            <input
              placeholder="+966 Xxx 2220"
              className="p-[14px_20px] 2xl:!p-[20px_35px] text-[#264787] placeholder:text-[#3B85C1] outline-none focus:outline-none bg-white px-2 !rounded-xl"
            />
          </div>
        </div>

        <div className="grid mt-3 2xl:mt-5 grid-cols-2 gap-[30px]">
          <div className="flex gap-[10px] 2xl:!gap-[17px] flex-col">
            <label className="italic text-[#264787] text-base 2xl:text-[19px]">
              Email
            </label>
            <input
              type="email"
              className="p-[14px_20px] 2xl:!p-[20px_35px] outline-none text-[#264787] focus:outline-none bg-white px-3 !rounded-xl"
            />
          </div>

          <div className="flex gap-[10px] 2xl:!gap-[17px] flex-col">
            <label className="italic text-[#264787] text-base 2xl:text-[19px]">
              Enter Your Old Password
            </label>

            {/* Styled like your other inputs */}
            <Input.Password
              placeholder="Your Password"
              className="!bg-white !p-[14px_20px] 2xl:!p-[20px_35px] !rounded-xl !border-0 !px-3 focus:!shadow-none"
              classNames={{
                affixWrapper:
                  "!bg-white !p-[14px_20px] 2xl:!p-[20px_35px] !rounded-xl !border !border-transparent !px-3 ",
                input: "text-[#264787] placeholder:text-[#3B85C1]",
                suffix: "text-[#3B85C1]",
              }}
              iconRender={(visible) =>
                visible ? <Eye size={18} /> : <EyeOff size={18} />
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[30px] mt-3 2xl:mt-5">
          <div className="flex gap-[10px] 2xl:!gap-[17px] flex-col">
            <label className="italic text-[#264787] text-base 2xl:text-[19px]">
              Enter Your Old Password
            </label>

            {/* Styled like your other inputs */}
            <Input.Password
              placeholder="New Password"
              className="!bg-white !p-[14px_20px] 2xl:!p-[20px_35px] !rounded-xl !border-0 !px-3 focus:!shadow-none"
              classNames={{
                affixWrapper:
                  "!bg-white !p-[14px_20px] 2xl:!p-[20px_35px] !rounded-xl !border !border-transparent !px-3 ",
                input: "text-[#264787] placeholder:text-[#3B85C1]",
                suffix: "text-[#3B85C1]",
              }}
              iconRender={(visible) =>
                visible ? <Eye size={18} /> : <EyeOff size={18} />
              }
            />
          </div>

          <div className="flex gap-[10px] 2xl:!gap-[17px] flex-col">
            <label className="italic text-[#264787] text-base 2xl:text-[19px]">
              Enter Your Old Password
            </label>

            {/* Styled like your other inputs */}
            <Input.Password
              placeholder="Confirm New Password"
              className="!bg-white !p-[14px_20px] 2xl:!p-[20px_35px] !rounded-xl !border-0 !px-3 focus:!shadow-none"
              classNames={{
                affixWrapper:
                  "!bg-white !p-[14px_20px] 2xl:!p-[20px_35px] !rounded-xl !border !border-transparent !px-3 ",
                input: "text-[#264787] placeholder:text-[#3B85C1]",
                suffix: "text-[#3B85C1]",
              }}
              iconRender={(visible) =>
                visible ? <Eye size={18} /> : <EyeOff size={18} />
              }
            />
          </div>
        </div>

        <div className="flex flex-col !gap-4 justify-center items-center !mt-10 2xl:!mt-15">
          <button className="flex gap-4 items-center">
            <Trash color="#F37878" size={20} />
            <span className="text-[#F37878]  italic text-base">
              Delete Account
            </span>
          </button>
          <button className="flex justify-center items-center bg-[#264787] !rounded-[37px] text-white w-[572px] h-[62px]">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
