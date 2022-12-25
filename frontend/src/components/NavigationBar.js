import React from "react";
import { useState } from "react";
import {
  Navbar,
  Dropdown,
  Avatar,
  Button,
  Modal,
  Label,
  Textarea,
  TextInput,
  Checkbox,
} from "flowbite-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DarkThemeToggle } from "flowbite-react";

const NavigationBar = () => {
  return (
    <Navbar
      fluid={true}
      class="px-4 pt-4 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700"
    >
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Form App
        </span>
      </Navbar.Brand>
      <Navbar.Toggle className="justify-left" />
      <Navbar.Collapse>
        <Navbar.Link href="/forms">Forms</Navbar.Link>
        <Navbar.Link href="/submissions">Submissions</Navbar.Link>
        <Navbar.Link href="/create">Add a Form</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
