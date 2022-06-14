import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import userApi from "../../../api/userApi";
import { alerts } from "../../../components/Alert/alertSlice";
import Button from "../../../components/Button";
import CardSection from "../../../components/CardSection";
import CloseButton from "../../../components/CloseButton";
import DatePicker from "../../../components/DatePicker";
import InputField from "../../../components/InputFile";
import { setModal } from "../../../components/Modal/modalSlice";
import Spinner from "../../../components/Spinner";
import { setUser } from "../../Auth/userSlice";
import ImgField from "./ImgField";

const schema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  address: yup.string(),
  description: yup.string(),
  gender: yup.string(),
  phoneNumber: yup.string(),
  birthDate: yup
    .date()
    .max(new Date(), "Are you a time traveler? Please Enter Valid BirthDay")
    .required(),
});

function ProFileEditForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.current);
  const [isDefault, setIsDefault] = useState(true);
  const [file, setFile] = useState();
  const [date, setDate] = useState(user.birthDate);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    setValue("birthDate", date);
  }, [date]);

  useEffect(() => {
    if (watch("name", "birthDate")) {
      setIsValid(true);
    } else setIsValid(false);
  }, [watch("name", "birthDate")]);

  const onSubmitHandler = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("gender", data.gender);
    formData.append("address", data.address);
    formData.append("birthDate", data.birthDate);
    formData.append("isDefault", isDefault);
    formData.append("isImageChange", !!file);
    formData.append("avatar", file);
    formData.append("updateAt", new Date());
    formData.append("description", data.description);
    formData.append("phoneNumber", data.phoneNumber);
    setIsLoading(true);
    const res = await userApi.updateUser(formData);
    if (res.data.success) {
      const alertAction = alerts({
        type: "success",
        message: res.data.message,
      });
      const setUserAction = setUser(res.data.user);
      dispatch(setUserAction);
      dispatch(alertAction);
    } else {
      const alertAction = alerts({
        type: "failure",
        message: res.data.message,
      });
      dispatch(alertAction);
    }

    setIsLoading(false);
    const modalAction = setModal({ isOpen: false, children: null });
    dispatch(modalAction);
  };
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute z-10 top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,0.5)]">
          <Spinner />
        </div>
      )}
      <CardSection
        title="Edit Profile"
        close={<CloseButton absolute={false} />}
      >
        <form
          className={`max-w-full w-[36rem] flex flex-col relative bg-white dark:bg-indigo-950 self-start px-4 space-y-6 `}
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmitHandler)}
          autoComplete="off"
        >
          <ImgField
            setIsDefault={setIsDefault}
            setFile={setFile}
            initialValue={user.avatar}
          />
          <InputField
            label="Full Name"
            type="text"
            name="name"
            register={register}
            error={errors.name}
            autofocus={true}
            defaultValue={user.name}
          />
          <DatePicker setDate={setDate} initialValue={user.birthDate} />
          <div className="flex flex-col space-y-6 h-[18rem] overflow-y-scroll scrollbar">
            <div>
              <legend className="text-2xl dark:text-textColorDark font-normal text-gray-600 mb-3">
                Gender
              </legend>

              <div className="flex space-x-16">
                {["male", "female", "other"].map((item) => (
                  <div className="flex items-center space-x-2" key={item}>
                    <input
                      type="radio"
                      name="gender"
                      id={item}
                      value={item}
                      {...register(`gender`)}
                      defaultChecked={user.gender === item}
                    />
                    <label htmlFor={item} className="capitalize">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <InputField
              label="Address"
              type="text"
              name="address"
              placeholder="Address"
              register={register}
              defaultValue={user.address}
            />
            <InputField
              label="Phone Number"
              type="text"
              name="phoneNumber"
              register={register}
              error={errors.phoneNumber}
              defaultValue={user.phoneNumber}
            />

            <div>
              <legend className="text-2xl font-normal text-gray-600 dark:text-textColorDark mb-3">
                Description
              </legend>
              <textarea
                className="outline-none border border-slate-200 dark:border-indigo-950 w-full rounded-xl bg-slate-100 focus:border-indigo-600 dark:bg-indigo-1050 px-4 py-4"
                type="text"
                rows="3"
                name="content"
                defaultValue={user.description}
                {...register("description")}
                placeholder="Write something..."
              />
            </div>
          </div>
          <div>
            <Button
              w={"w-full mt-6"}
              p={"p-4"}
              isValid={isValid && !isLoading}
              type="submit"
            >
              Save Edit
            </Button>
          </div>
        </form>
      </CardSection>
    </div>
  );
}

export default ProFileEditForm;
