import React from "react";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Cell } from "zarm";
import { useNavigate } from "react-router-dom";
import { typeMap } from '@utils';

import s from './style/module.less'