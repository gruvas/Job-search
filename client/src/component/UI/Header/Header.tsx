import coat_arms_img from '../../../img/coat_arms.jpg'
import { IStorageData } from '../../interface/IStorageData'
import Authorization from '../Authorization/Authorization'
import PersonalArea from './Personal_Area'

const Header = () => {
	let storeg: IStorageData = JSON.parse(
		localStorage.getItem('useData') || 'false'
	)

	return (
		<header className='header'>
			<h1 className='left_header'>РАБОТА РОССИИ кадровый центр</h1>

			<h1 className='center_header'>
				Интерактивный портал службы занятости населения Орловского района
			</h1>

			<img
				className='coat_arms_img'
				src={coat_arms_img}
				alt=''
			/>

			{!!storeg.token ? <PersonalArea /> : <Authorization />}
		</header>
	)
}

export default Header
